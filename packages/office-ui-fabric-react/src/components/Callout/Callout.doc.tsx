import * as React from 'react';
import { items } from '../CommandBar/examples/data';

import { IDocPageProps } from '../../common/DocPage.types';

import { CalloutBasicExample } from './examples/Callout.Basic.Example';
import { CalloutNestedExample } from './examples/Callout.Nested.Example';
import { CalloutFocusTrapExample } from './examples/Callout.FocusTrap.Example';
import { CalloutDirectionalExample } from './examples/Callout.Directional.Example';
import { CalloutCoverExample } from './examples/Callout.Cover.Example';

const CalloutBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Basic.Example.tsx') as string;
const CalloutBasicExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Basic.Example.tsx') as string;

const CalloutNestedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Nested.Example.tsx') as string;
const CalloutNestedExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Nested.Example.tsx') as string;

const CalloutFocusTrapExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.FocusTrap.Example.tsx') as string;
const CalloutFocusTrapExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.FocusTrap.Example.tsx') as string;

const CalloutDirectionalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Directional.Example.tsx') as string;
const CalloutDirectionalExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Directional.Example.tsx') as string;

const CalloutCoverExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Cover.Example.tsx') as string;
const CalloutCoverExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Cover.Example.tsx') as string;

const cmdBarParamsTextAndIcons: any = { items: items, farItems: null };

export const CalloutPageProps: IDocPageProps = {
  title: 'Callout',
  componentName: 'Callout',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Callout',
  examples: [
    {
      title: 'Default Callout',
      code: CalloutBasicExampleCode,
      codepenJS: CalloutBasicExampleCodepen,
      view: <CalloutBasicExample />
    },
    {
      title: 'Nested Callout... Callout with a commandbar with a sub menu',
      code: CalloutNestedExampleCode,
      codepenJS: CalloutNestedExampleCodepen,
      view: <CalloutNestedExample {...cmdBarParamsTextAndIcons} />
    },
    {
      title: 'Focus Trap Callout',
      code: CalloutFocusTrapExampleCode,
      codepenJS: CalloutFocusTrapExampleCodepen,
      view: <CalloutFocusTrapExample {...cmdBarParamsTextAndIcons} />
    },
    {
      title: 'Callout with directional hint',
      code: CalloutDirectionalExampleCode,
      codepenJS: CalloutDirectionalExampleCodepen,
      view: <CalloutDirectionalExample />
    },
    {
      title: 'Callout with cover',
      code: CalloutCoverExampleCode,
      codepenJS: CalloutCoverExampleCodepen,
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
