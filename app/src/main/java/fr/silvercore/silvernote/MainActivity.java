package fr.silvercore.silvernote;

import android.annotation.SuppressLint;
import android.app.DownloadManager;
import android.content.ActivityNotFoundException;
import android.content.ClipData;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.webkit.CookieManager;
import android.webkit.URLUtil;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;


import androidx.activity.OnBackPressedCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Environment;

public class MainActivity extends AppCompatActivity {
    private static final String APP_URL = "https://app.silvernote.fr/";
    private WebView webView;
    private ValueCallback<Uri[]> filePathCallback;

    private final ActivityResultLauncher<Intent> fileChooserLauncher =
            registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), result -> {
                if (filePathCallback == null) return;
                Uri[] uris = null;
                if (result.getResultCode() == RESULT_OK && result.getData() != null) {
                    Intent data = result.getData();
                    if (data.getData() != null) {
                        uris = new Uri[]{ data.getData() };
                    } else if (data.getClipData() != null) {
                        ClipData clip = data.getClipData();
                        uris = new Uri[clip.getItemCount()];
                        for (int i = 0; i < clip.getItemCount(); i++) uris[i] = clip.getItemAt(i).getUri();
                    }
                }
                filePathCallback.onReceiveValue(uris);
                filePathCallback = null;
            });

    @SuppressLint("SetJavaScriptEnabled")
    @Override protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        View root = findViewById(android.R.id.content);
        ViewCompat.setOnApplyWindowInsetsListener(root, (v, insets) -> {
            int top = insets.getInsets(WindowInsetsCompat.Type.statusBars()).top;
            v.setPadding(0, top - 15, 0, 0);
            return insets;
        });
        if (getSupportActionBar() != null) getSupportActionBar().hide();

        webView = findViewById(R.id.webview);

        CookieManager cm = CookieManager.getInstance();
        cm.setAcceptCookie(true);
        cm.setAcceptThirdPartyCookies(webView, true);
        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(true);
        s.setAllowContentAccess(true);
        s.setCacheMode(WebSettings.LOAD_DEFAULT);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);

        webView.setWebViewClient(new WebViewClient() {
            @Override public boolean shouldOverrideUrlLoading(WebView view, android.webkit.WebResourceRequest request) {
                return false;
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override public boolean onShowFileChooser(WebView wv, ValueCallback<Uri[]> callback, FileChooserParams params) {
                if (filePathCallback != null) filePathCallback.onReceiveValue(null);
                filePathCallback = callback;
                Intent intent = params.createIntent();
                try {
                    fileChooserLauncher.launch(intent);
                } catch (ActivityNotFoundException e) {
                    Toast.makeText(MainActivity.this, "Aucun gestionnaire de fichiers", Toast.LENGTH_SHORT).show();
                    filePathCallback = null;
                    return false;
                }
                return true;
            }
        });

        webView.setDownloadListener((url, userAgent, contentDisposition, mimetype, contentLength) -> {
            DownloadManager.Request req = new DownloadManager.Request(Uri.parse(url));
            String fileName = URLUtil.guessFileName(url, contentDisposition, mimetype);
            req.setTitle(fileName);
            req.setDescription("Téléchargement…");
            req.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
            req.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, fileName);
            DownloadManager dm = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
            dm.enqueue(req);
        });
        webView.loadUrl(APP_URL);

        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (webView != null && webView.canGoBack()) {
                    webView.goBack();
                } else {
                    finish();
                }
            }
        });
    }

    @Override protected void onPause() {
        super.onPause();
        CookieManager.getInstance().flush();
    }
}
