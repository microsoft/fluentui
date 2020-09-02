import * as React from 'react';

import { IDocPageProps } from '../../common/DocPage.types';

import { CalloutBasicExample } from './examples/Callout.Basic.Example';
import { StatusCalloutExample } from './examples/Callout.Status.Example';
import { CalloutFocusTrapExample } from './examples/Callout.FocusTrap.Example';
import { CalloutDirectionalExample } from './examples/Callout.Directional.Example';
import { CalloutCoverExample } from './examples/Callout.Cover.Example';

const CalloutBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Basic.Example.tsx') as string;
const StatusCalloutExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Status.Example.tsx') as string;
const CalloutFocusTrapExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.FocusTrap.Example.tsx') as string;
const CalloutDirectionalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Directional.Example.tsx') as string;
const CalloutCoverExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Cover.Example.tsx') as string;

export const CalloutPageProps: IDocPageProps = {
  title: 'Callout',
  componentName: 'Callout',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Callout',
  examples: [
    {
      title: 'Default Callout',
      code: CalloutBasicExampleCode,
      view: <CalloutBasicExample />,
    },

    {
      title: 'FocusTrapCallout Variant',
      code: CalloutFocusTrapExampleCode,
      view: <CalloutFocusTrapExample />,
    },
    {
      title: 'Non-focusable Callout with accessible text',
      code: StatusCalloutExampleCode,
      view: <StatusCalloutExample />,
    },
    {
      title: 'Callout with directional hint',
      code: CalloutDirectionalExampleCode,
      view: <CalloutDirectionalExample />,
    },
    {
      title: 'Callout that covers the target element',
      code: CalloutCoverExampleCode,
      view: <CalloutCoverExample />,
    },
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Callout/docs/CalloutOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/Callout/docs/CalloutBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
