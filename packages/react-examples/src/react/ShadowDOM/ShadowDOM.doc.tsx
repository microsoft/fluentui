import * as React from 'react';
import { ShadowDOMDefaultExample } from './ShadowDOM.Default.Example';
import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

const ShadowDOMDefaultExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ShadowDOM/ShadowDOM.Default.Example.tsx') as string;

/**
 * Exports a function because the documentation of this page requires some interactivity that is passed in here
 * as a prop.
 */
export const ShadowDOMPageProps = (): IDocPageProps => ({
  title: 'ShadowDOM',
  componentName: 'ShadowDOMExample',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/merge-styles/src/Stylesheet',
  examples: [
    {
      title: 'Default Button',
      code: ShadowDOMDefaultExampleCode,
      view: <ShadowDOMDefaultExample />,
    },
  ],

  allowNativeProps: false,
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ShadowDOM/docs/ShadowDOMOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ShadowDOM/docs/ShadowDOMBestPractices.md'),

  isHeaderVisible: true,
  isFeedbackVisible: true,
});
