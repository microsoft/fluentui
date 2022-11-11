import * as React from 'react';
import { Provider, teamsTheme } from '@fluentui/react-northstar';
import Screener from 'screener-storybook/src/screener';

/** @type {import("@fluentui/react-storybook-addon").FluentParameters} */
export const parameters = { layout: 'none' };
/** @type {import("@storybook/react").DecoratorFn[]} */
export const decorators = [
  (story, context) => {
    const isRtl = context.id.toLowerCase().includes('rtl');

    return (
      <Provider theme={teamsTheme} dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="testWrapper" style={{ width: '600px' }}>
          {story()}
        </div>
      </Provider>
    );
  },
];

// For static storybook per https://github.com/screener-io/screener-storybook#testing-with-static-storybook-app
if (typeof window === 'object') {
  /** @type {*} */ (window).__screener_storybook__ = require('@storybook/react').getStorybook;
}
