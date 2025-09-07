import 'dart:io';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webview_flutter_android/webview_flutter_android.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:http/http.dart' as http;

const appUrl = 'https://app.silvernote.fr/';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const SilverNoteApp());
}

class SilverNoteApp extends StatelessWidget {
  const SilverNoteApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      themeMode: ThemeMode.system,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFF28C28),
          brightness: Brightness.light,
        ),
        scaffoldBackgroundColor: Colors.white,
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFF28C28),
          brightness: Brightness.dark,
        ),
        scaffoldBackgroundColor: const Color(0xFF121212),
      ),
      home: const MainPage(),
    );
  }
}

class MainPage extends StatefulWidget {
  const MainPage({super.key});
  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  late final WebViewController _controller;
  bool _online = true;
  bool _initialized = false;
  bool _canGoBack = false;

  @override
  void initState() {
    super.initState();
    _initConnectivityListener();
    _setup();
  }

  Stream<List<ConnectivityResult>>? _connStream;
  void _initConnectivityListener() {
    _connStream = Connectivity().onConnectivityChanged;
    _connStream!.listen((results) async {
      final hasNet = !results.contains(ConnectivityResult.none);
      final reachable = hasNet ? await _hasInternet() : false;
      if (mounted) setState(() => _online = reachable);
      if (reachable && _initialized) {
        try {
          await _controller.reload();
        } catch (_) {}
      }
    });
  }

  Future<bool> _hasInternet() async {
    try {
      final resp = await http
          .head(Uri.parse('https://www.google.com/generate_204'))
          .timeout(const Duration(seconds: 3));
      return resp.statusCode == 204 ||
          (resp.statusCode >= 200 && resp.statusCode < 400);
    } catch (_) {
      return false;
    }
  }

  Future<void> _setup() async {
    final initialConn = await Connectivity().checkConnectivity();
    final hasNet = initialConn != ConnectivityResult.none;
    final reachable = hasNet ? await _hasInternet() : false;
    setState(() => _online = reachable);

    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(Colors.transparent)
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageFinished: (_) async {
            final can = await _controller.canGoBack();
            if (mounted) setState(() => _canGoBack = can);
          },
          onNavigationRequest: (req) => NavigationDecision.navigate,
        ),
      )
      ..loadRequest(Uri.parse(appUrl));

    if (Platform.isAndroid) {
      final androidCtrl = _controller.platform as AndroidWebViewController;
      await androidCtrl.setOnShowFileSelector((params) async {
        return <String>[];
      });
    }

    setState(() => _initialized = true);
  }

  Future<void> _retry() async {
    final reachable = await _hasInternet();
    if (mounted) setState(() => _online = reachable);
    if (reachable) {
      if (_initialized) {
        try {
          await _controller.reload();
        } catch (_) {}
      } else {
        await _setup();
      }
    }
  }
  

  @override
  Widget build(BuildContext context) {
    final topPadding = MediaQuery.of(context).padding.top - 7.5;
    final header = Container(
      height: topPadding,
      color: const Color(0xFFF28C28),
    );
    

    if (!_online) {
      final cs = Theme.of(context).colorScheme;
      return Scaffold(
        backgroundColor: cs.surface,
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(32),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  Icons.signal_wifi_connected_no_internet_4,
                  size: 120,
                  color: cs.secondary,
                ),
                const SizedBox(height: 24),
                Text(
                  'Pas de connexion internet',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const SizedBox(height: 8),
                Text(
                  'Vérifier la connexion réseau et réessayer.',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
                const SizedBox(height: 24),
                FilledButton.icon(
                  onPressed: _retry,
                  icon: const Icon(Icons.refresh),
                  label: const Text('Réessayer'),
                ),
              ],
            ),
          ),
        ),
      );
    }

    return PopScope(
      canPop: !_canGoBack,
      onPopInvokedWithResult: (didPop, result) async {
        if (didPop) return;
        if (await _controller.canGoBack()) {
          await _controller.goBack();
          final can = await _controller.canGoBack();
          if (mounted) setState(() => _canGoBack = can);
        }
      },
      child: Scaffold(
        body: Column(
          children: [
            header,
            Expanded(
              child: _initialized
                  ? WebViewWidget(controller: _controller)
                  : const Center(child: CircularProgressIndicator()),
            ),
          ],
        ),
      ),
    );
  }
}
