import { defineConfig } from 'cypress';
import { baseConfig } from '@fluentui/scripts-cypress';

export default defineConfig({
  ...baseConfig,
  component: {
    ...baseConfig.component,
    setupNodeEvents(on, config) {
      const mode = config.env.focusgroup;
      if (mode !== undefined && mode !== 'native' && mode !== 'polyfill') {
        throw new Error('focusgroup must be native or polyfill.');
      }

      on('before:browser:launch', (browser, launchOptions) => {
        if (mode && browser.family !== 'chromium') {
          throw new Error('Explicit focusgroup compatibility runs require a Chromium browser.');
        }
        if (mode === 'polyfill') {
          launchOptions.args.push('--disable-blink-features=Focusgroup,FocusgroupV2');
        } else if (mode === 'native') {
          launchOptions.args.push('--enable-blink-features=Focusgroup', '--disable-blink-features=FocusgroupV2');
        }
        return launchOptions;
      });

      return config;
    },
  },
});
