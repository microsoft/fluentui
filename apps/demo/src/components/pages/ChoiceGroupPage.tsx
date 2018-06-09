import * as React from 'react';
import { ChoiceGroupBasicExample } from 'office-ui-fabric-react/lib/components/ChoiceGroup/examples/ChoiceGroup.Basic.Example';
import { DemoPage } from '../DemoPage';
import { IDemoPageProps } from '../DemoPage.types';
import { ChoiceGroupCustomExample } from 'office-ui-fabric-react/lib/components/ChoiceGroup/examples/ChoiceGroup.Custom.Example';
import { ChoiceGroupImageExample } from 'office-ui-fabric-react/lib/components/ChoiceGroup/examples/ChoiceGroup.Image.Example';
import { ChoiceGroupIconExample } from 'office-ui-fabric-react/lib/components/ChoiceGroup/examples/ChoiceGroup.Icon.Example';
import { ChoiceGroupStatus } from 'office-ui-fabric-react/lib/components/ChoiceGroup/ChoiceGroup.checklist';

const ChoiceGroupBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Basic.Example.tsx') as string;
const ChoiceGroupCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Custom.Example.tsx') as string;
const ChoiceGroupImageExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Image.Example.tsx') as string;
const ChoiceGroupIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Icon.Example.tsx') as string;

export const ChoiceGroupPageProps: IDemoPageProps = {
  title: 'ChoiceGroup',
  componentName: 'ChoiceGroup',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ChoiceGroup',
  componentStatus: ChoiceGroupStatus,
  examples: [
    {
      title: 'Default ChoiceGroup',
      code: ChoiceGroupBasicExampleCode,
      view: <ChoiceGroupBasicExample />
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
  allowNativeProps: true,
  nativePropsElement: 'input'
};

export const ChoiceGroupPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...ChoiceGroupPageProps, ...props }} />
);
