import { addons } from '@storybook/addons';
import fluentStorybookTheme from './theme';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { STORY_CHANGED, STORY_ERRORED, STORY_MISSING } from '@storybook/core-events';

addons.setConfig({
  theme: fluentStorybookTheme,
  showPanel: false,
});

addons.register('application-insights', api => {
  if (process.env.NODE_ENV === 'production') {
    const { STORYBOOK_APPINSIGHTS_INSTRUMENTATION_KEY } = process.env;

    if (STORYBOOK_APPINSIGHTS_INSTRUMENTATION_KEY) {
      const appInsights = new ApplicationInsights({
        config: {
          connectionString: STORYBOOK_APPINSIGHTS_INSTRUMENTATION_KEY,
          disableCookiesUsage: true,
        },
      });

      appInsights.loadAppInsights();

      const trackError = (/** @type {string | undefined} */ eventData) => {
        appInsights.trackException({ exception: new Error(eventData) });
      };

      appInsights.trackPageView();

      api.on(STORY_CHANGED, eventData => {
        appInsights.trackPageView({ name: eventData });
      });

      api.on(STORY_ERRORED, trackError);
      api.on(STORY_MISSING, trackError);
    } else {
      console.warn(`[application-insights] instrumentation key not found in window or env variable`);
    }
  }
});
