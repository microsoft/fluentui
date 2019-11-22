import * as React from 'react';

import { IDocPageProps } from '../../common/DocPage.types';

import { CalloutBasicExample } from './examples/Callout.Basic.Example';
import { CalloutFocusTrapExample } from './examples/Callout.FocusTrap.Example';
import { CalloutDirectionalExample } from './examples/Callout.Directional.Example';
import { CalloutCoverExample } from './examples/Callout.Cover.Example';

const CalloutBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Basic.Example.tsx') as string;
const CalloutFocusTrapExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.FocusTrap.Example.tsx') as string;
const CalloutDirectionalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Directional.Example.tsx') as string;
const CalloutCoverExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Cover.Example.tsx') as string;

export const CalloutPageProps: IDocPageProps = {
  title: 'Callout',
  componentName: 'Callout',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Callout',
  examples: [
    {
      title: 'Default Callout',
      code: CalloutBasicExampleCode,
      view: <CalloutBasicExample />
    },
    {
      title: 'Custom Content and Focus Trap Callout',
      code: CalloutFocusTrapExampleCode,
      view: <CalloutFocusTrapExample />
    },
    {
      title: 'Callout with directional hint',
      code: CalloutDirectionalExampleCode,
      view: <CalloutDirectionalExample />
    },
    {
      title: 'Callout with cover',
      code: CalloutCoverExampleCode,
      view: <CalloutCoverExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Callout/docs/CalloutOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Callout/docs/CalloutDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Callout/docs/CalloutDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
