import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.developeradam.app',
  appName: 'developer-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ['apple.com', 'facebook.com', 'google.com'],
    },
  },
};

export default config;
