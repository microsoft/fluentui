import * as React from 'react';
import { PivotBasicExample } from './examples/Pivot.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { PivotIconCountExample } from './examples/Pivot.IconCount.Example';
import { PivotLargeExample } from './examples/Pivot.Large.Example';
import { PivotTabsExample } from './examples/Pivot.Tabs.Example';
import { PivotTabsLargeExample } from './examples/Pivot.TabsLarge.Example';
import { PivotOnChangeExample } from './examples/Pivot.OnChange.Example';
import { PivotRemoveExample } from './examples/Pivot.Remove.Example';
import { PivotOverrideExample } from './examples/Pivot.Override.Example';
import { PivotSeparateExample } from './examples/Pivot.Separate.Example';
import { PivotSeparateNoSelectedKeyExample } from './examples/Pivot.SeparateNoSelectedKey.Example';

const PivotRemoveExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.Remove.Example.tsx') as string;
const PivotBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.Basic.Example.tsx') as string;
const PivotLargeExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.Large.Example.tsx') as string;
const PivotTabsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.Tabs.Example.tsx') as string;
const PivotTabsLargeExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.TabsLarge.Example.tsx') as string;
const PivotOnChangeExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.OnChange.Example.tsx') as string;
const PivotIconCountExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.IconCount.Example.tsx') as string;
const PivotOverrideExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.Override.Example.tsx') as string;
const PivotSeparateExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.Separate.Example.tsx') as string;
const PivotNoSelectedKeyExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.SeparateNoSelectedKey.Example.tsx') as string;

export const PivotPageProps: IDocPageProps = {
  title: 'Pivot',
  componentName: 'Pivot',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Pivot',
  examples: [
    {
      title: 'Default Pivot',
      code: PivotBasicExampleCode,
      view: <PivotBasicExample />
    },
    {
      title: 'Count and Icon',
      code: PivotIconCountExampleCode,
      view: <PivotIconCountExample />
    },
    {
      title: 'Large link size',
      code: PivotLargeExampleCode,
      view: <PivotLargeExample />
    },
    {
      title: 'Links of tab style',
      code: PivotTabsExampleCode,
      view: <PivotTabsExample />
    },
    {
      title: 'Links of large tab style',
      code: PivotTabsLargeExampleCode,
      view: <PivotTabsLargeExample />
    },
    {
      title: 'Trigger onchange event',
      code: PivotOnChangeExampleCode,
      view: <PivotOnChangeExample />
    },
    {
      title: 'Show/Hide pivot item',
      code: PivotRemoveExampleCode,
      view: <PivotRemoveExample />
    },
    {
      title: 'Override selected item',
      code: PivotOverrideExampleCode,
      view: <PivotOverrideExample />
    },
    {
      title: 'Render content separately',
      code: PivotSeparateExampleCode,
      view: <PivotSeparateExample />
    },
    {
      title: 'No pivots selected',
      code: PivotNoSelectedKeyExampleCode,
      view: <PivotSeparateNoSelectedKeyExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Pivot/docs/PivotOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Pivot/docs/PivotDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Pivot/docs/PivotDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativePropsForComponentName: 'PivotItem',
  allowNativeProps: true
};
