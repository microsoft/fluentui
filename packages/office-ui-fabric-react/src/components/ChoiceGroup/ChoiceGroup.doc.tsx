import * as React from 'react';
import { ChoiceGroupBasicExample } from './examples/ChoiceGroup.Basic.Example';
import { ChoiceGroupLabelExample } from './examples/ChoiceGroup.Label.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { ChoiceGroupCustomExample } from './examples/ChoiceGroup.Custom.Example';
import { ChoiceGroupImageExample } from './examples/ChoiceGroup.Image.Example';
import { ChoiceGroupIconExample } from './examples/ChoiceGroup.Icon.Example';

const ChoiceGroupBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Basic.Example.tsx') as string;
const ChoiceGroupLabelExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Label.Example.tsx') as string;
const ChoiceGroupCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Custom.Example.tsx') as string;
const ChoiceGroupImageExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Image.Example.tsx') as string;
const ChoiceGroupIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Icon.Example.tsx') as string;

export const ChoiceGroupPageProps: IDocPageProps = {
  title: 'ChoiceGroup',
  componentName: 'ChoiceGroup',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ChoiceGroup',
  examples: [
    {
      title: 'Default ChoiceGroup',
      code: ChoiceGroupBasicExampleCode,
      view: <ChoiceGroupBasicExample />
    },
    {
      title: 'ChoiceGroup with a custom label',
      code: ChoiceGroupLabelExampleCode,
      view: <ChoiceGroupLabelExample />
    },
    {
      title: 'ChoiceGroup with dropdown',
      code: ChoiceGroupCustomExampleCode,
      view: <ChoiceGroupCustomExample />
    },
    {
      title: 'ChoiceGroups with images',
      code: ChoiceGroupImageExampleCode,
      view: <ChoiceGroupImageExample />
    },
    {
      title: 'ChoiceGroup with icons',
      code: ChoiceGroupIconExampleCode,
      view: <ChoiceGroupIconExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/docs/ChoiceGroupOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/docs/ChoiceGroupDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/docs/ChoiceGroupDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
  nativePropsElement: 'input'
};
