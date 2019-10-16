import * as React from 'react';
import { SeparatorBasicExample } from './examples/Separator.Basic.Example';
import { SeparatorThemingExample } from './examples/Separator.Theming.Example';
import { SeparatorIconExample } from './examples/Separator.Icon.Example';

import { IDocPageProps } from '../../common/DocPage.types';

const SeparatorBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Separator/examples/Separator.Basic.Example.tsx') as string;

const SeparatorThemingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Separator/examples/Separator.Theming.Example.tsx') as string;

const SeparatorIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Separator/examples/Separator.Icon.Example.tsx') as string;

export const SeparatorPageProps: IDocPageProps = {
  title: 'Separator',
  componentName: 'Separator',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Separator',
  examples: [
    {
      title: 'Basic Separator with Text',
      code: SeparatorBasicExampleCode,
      view: <SeparatorBasicExample />
    },
    {
      title: 'Basic Themed Separator with Text',
      code: SeparatorThemingExampleCode,
      view: <SeparatorThemingExample />
    },
    {
      title: 'Separator With Icon',
      code: SeparatorIconExampleCode,
      view: <SeparatorIconExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Separator/docs/SeparatorOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Separator/docs/SeparatorDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Separator/docs/SeparatorDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
