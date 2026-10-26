import { baseConfig } from '@fluentui/scripts-cypress';
import { defineConfig } from 'cypress';

export default defineConfig({
  ...baseConfig,
  // The bundled Electron versions in React integration tests predate CSS position-area.
  defaultBrowser: 'chrome',
  component: {
    ...baseConfig.component,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        // Compatibility tests assert the polyfill's DOM tab stops; native navigation is tested separately.
        if (browser.family === 'chromium' && !config.env.nativeFocusgroup) {
          launchOptions.args.push('--disable-blink-features=Focusgroup');
        }
        return launchOptions;
      });
    },
  },
});
