import * as React from 'react';
import { ResizeGroupOverflowSetExample } from './ResizeGroup.OverflowSet.Example';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';
import { FlexBoxResizeGroupExample } from './ResizeGroup.FlexBox.Example';
import { ResizeGroupVerticalOverflowSetExample } from './ResizeGroup.VerticalOverflowSet.Example';

const ResizeGroupBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ResizeGroup/ResizeGroup.OverflowSet.Example.tsx') as string;

const ResizeGroupVerticalExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ResizeGroup/ResizeGroup.VerticalOverflowSet.Example.tsx') as string;

const ResizeGroupFlexBoxExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ResizeGroup/ResizeGroup.FlexBox.Example.tsx') as string;

export const ResizeGroupPageProps: IDocPageProps = {
  title: 'ResizeGroup',
  componentName: 'ResizeGroup',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/ResizeGroup',
  examples: [
    {
      title: 'Use ResizeGroup to move commands into an overflow menu',
      code: ResizeGroupBasicExampleCode,
      view: <ResizeGroupOverflowSetExample />,
    },
    {
      title: 'Use a vertical ResizeGroup to move commands into an overflow menu',
      code: ResizeGroupVerticalExampleCode,
      view: <ResizeGroupVerticalOverflowSetExample />,
      isScrollable: false,
    },
    {
      title: 'Use ResizeGroup to prevent two groups of items from overlapping',
      code: ResizeGroupFlexBoxExampleCode,
      view: <FlexBoxResizeGroupExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ResizeGroup/docs/ResizeGroupOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ResizeGroup/docs/ResizeGroupBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ResizeGroup/docs/ResizeGroupDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ResizeGroup/docs/ResizeGroupDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
};
