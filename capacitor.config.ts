import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fr.silvercore.silvernote',
  appName: 'silvernote',
  webDir: 'dist',
  android: {
    icon: 'resources/icon.png',
  },
  ios: {
    icon: 'resources/icon.png',
  },
};

export default config;
