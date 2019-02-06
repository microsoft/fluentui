import * as React from 'react';
import { ResizeGroupOverflowSetExample } from './examples/ResizeGroup.OverflowSet.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { FlexBoxResizeGroupExample } from './examples/ResizeGroup.FlexBox.Example';
import { ResizeGroupStatus } from './ResizeGroup.checklist';

const ResizeGroupBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/examples/ResizeGroup.OverflowSet.Example.tsx') as string;

const ResizeGroupFlexBoxExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/examples/ResizeGroup.FlexBox.Example.tsx') as string;

export const ResizeGroupPageProps: IDocPageProps = {
  title: 'ResizeGroup',
  componentName: 'ResizeGroup',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ResizeGroup',
  componentStatus: ResizeGroupStatus,
  examples: [
    {
      title: 'Use ResizeGroup to move commands into an overflow menu',
      code: ResizeGroupBasicExampleCode,
      view: <ResizeGroupOverflowSetExample />
    },
    {
      title: 'Use ResizeGroup to prevent two groups of items from overlapping',
      code: ResizeGroupFlexBoxExampleCode,
      view: <FlexBoxResizeGroupExample />
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/ResizeGroup.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/docs/ResizeGroupOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/docs/ResizeGroupDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/docs/ResizeGroupDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true
};
