import * as React from 'react';
import { items } from '../CommandBar/examples/data';

import { IDocPageProps } from '../../common/DocPage.types';

import { CalloutBasicExample } from './examples/Callout.Basic.Example';
import { CalloutNestedExample } from './examples/Callout.Nested.Example';
import { CalloutDirectionalExample } from './examples/Callout.Directional.Example';
import { CalloutCoverExample } from './examples/Callout.Cover.Example';
import { CalloutStatus } from './Callout.checklist';

const CalloutBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Basic.Example.tsx') as string;
const CalloutNestedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Nested.Example.tsx') as string;
const CalloutDirectionalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Directional.Example.tsx') as string;
const CalloutCoverExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Cover.Example.tsx') as string;

const cmdBarParamsTextAndIcons: any = { items: items, farItems: null };

export const CalloutPageProps: IDocPageProps = {
  title: 'Callout',
  componentName: 'Callout',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Callout',
  componentStatus: CalloutStatus,
  examples: [
    {
      title: 'Default Callout',
      code: CalloutBasicExampleCode,
      view: <CalloutBasicExample />
    },
    {
      title: 'Nested Callout... Callout with a commandbar with a sub menu',
      code: CalloutNestedExampleCode,
      view: <CalloutNestedExample {...cmdBarParamsTextAndIcons} />
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
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/Callout/Callout.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Callout/docs/CalloutOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Callout/docs/CalloutDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Callout/docs/CalloutDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
