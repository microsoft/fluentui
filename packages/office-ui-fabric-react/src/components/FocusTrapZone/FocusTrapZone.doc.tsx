import * as React from 'react';

import { IDocPageProps } from '../../common/DocPage.types';

import { FocusTrapZoneBoxExample } from './examples/FocusTrapZone.Box.Example';
const FocusTrapZoneBoxExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/examples/FocusTrapZone.Box.Example.tsx') as string;

import { FocusTrapZoneBoxCustomElementExample } from './examples/FocusTrapZone.Box.FocusOnCustomElement.Example';
const FocusTrapZoneBoxCustomElementExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/examples/FocusTrapZone.Box.FocusOnCustomElement.Example.tsx') as string;

import { FocusTrapZoneBoxClickExample } from './examples/FocusTrapZone.Box.Click.Example';
const FocusTrapZoneBoxClickExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/examples/FocusTrapZone.Box.Click.Example.tsx') as string;

import { FocusTrapZoneNestedExample } from './examples/FocusTrapZone.Nested.Example';
const FocusTrapZoneNestedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/examples/FocusTrapZone.Nested.Example.tsx') as string;

import { FocusTrapZoneFocusZoneExample } from './examples/FocusTrapZone.FocusZone.Example';
const FocusTrapZoneFocusZoneExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/examples/FocusTrapZone.FocusZone.Example.tsx') as string;

import { FocusTrapZoneDialogInPanelExample } from './examples/FocusTrapZone.DialogInPanel.Example';
const FocusTrapZoneDialogInPanelExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/examples/FocusTrapZone.DialogInPanel.Example.tsx') as string;

export const FocusTrapZonePageProps: IDocPageProps = {
  title: 'FocusTrapZone',
  componentName: 'FocusTrapZone',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/FocusTrapZone',
  examples: [
    {
      title: 'Simple box',
      code: FocusTrapZoneBoxExampleCode,
      view: <FocusTrapZoneBoxExample />
    },
    {
      title: 'Simple box with focus on custom focusable element',
      code: FocusTrapZoneBoxCustomElementExampleCode,
      view: <FocusTrapZoneBoxCustomElementExample />
    },
    {
      title: 'Simple box with clicking outside trap zone enabled',
      code: FocusTrapZoneBoxClickExampleCode,
      view: <FocusTrapZoneBoxClickExample />
    },
    {
      title: 'Multiple nested FocusTrapZones',
      code: FocusTrapZoneNestedExampleCode,
      view: <FocusTrapZoneNestedExample />
    },
    {
      title: 'FocusTrapZone with FocusZones',
      code: FocusTrapZoneFocusZoneExampleCode,
      view: <FocusTrapZoneFocusZoneExample />
    },
    {
      title: 'A Dialog nested in a Panel',
      code: FocusTrapZoneDialogInPanelExampleCode,
      view: <FocusTrapZoneDialogInPanelExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/docs/FocusTrapZoneOverview.md'),
  bestPractices: '',
  dos: '',
  donts: '',
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true
};
