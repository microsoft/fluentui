import * as React from 'react';
import { ChoiceGroupBasicExample } from './examples/ChoiceGroup.Basic.Example';
import { ChoiceGroupLabelExample } from './examples/ChoiceGroup.Label.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { ChoiceGroupCustomExample } from './examples/ChoiceGroup.Custom.Example';
import { ChoiceGroupImageExample } from './examples/ChoiceGroup.Image.Example';
import { ChoiceGroupIconExample } from './examples/ChoiceGroup.Icon.Example';
import { ChoiceGroupStatus } from './ChoiceGroup.checklist';

const ChoiceGroupBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Basic.Example.tsx') as string;
const ChoiceGroupBasicExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/ChoiceGroup/ChoiceGroup.Basic.Example.Codepen.txt') as string;
const ChoiceGroupLabelExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Label.Example.tsx') as string;
const ChoiceGroupLabelExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/ChoiceGroup/ChoiceGroup.Label.Example.Codepen.txt') as string;
const ChoiceGroupCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Custom.Example.tsx') as string;
const ChoiceGroupImageExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Image.Example.tsx') as string;
const ChoiceGroupIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Icon.Example.tsx') as string;
const ChoiceGroupIconExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/ChoiceGroup/ChoiceGroup.Icon.Example.Codepen.txt') as string;

export const ChoiceGroupPageProps: IDocPageProps = {
  title: 'ChoiceGroup',
  componentName: 'ChoiceGroup',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ChoiceGroup',
  componentStatus: ChoiceGroupStatus,
  examples: [
    {
      title: 'Default ChoiceGroup',
      code: ChoiceGroupBasicExampleCode,
      view: <ChoiceGroupBasicExample />,
      codepenJS: ChoiceGroupBasicExampleCodepen
    },
    {
      title: 'ChoiceGroup with a custom label',
      code: ChoiceGroupLabelExampleCode,
      view: <ChoiceGroupLabelExample />,
      codepenJS: ChoiceGroupLabelExampleCodepen
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
      view: <ChoiceGroupIconExample />,
      codepenJS: ChoiceGroupIconExampleCodepen
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/ChoiceGroup.types.ts')
  ],
  overview: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/docs/ChoiceGroupOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/docs/ChoiceGroupDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/docs/ChoiceGroupDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
  nativePropsElement: 'input'
};
