// @ts-check

import * as React from 'react';
import { Provider, teamsTheme } from '@fluentui/react-northstar';

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
