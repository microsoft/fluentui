import * as React from 'react';
import { IDocPageProps } from '@fluentui/react-next/lib/common/DocPage.types';

import { ChoiceGroupBasicExample } from './ChoiceGroup.Basic.Example';
import { ChoiceGroupControlledExample } from './ChoiceGroup.Controlled.Example';
import { ChoiceGroupLabelExample } from './ChoiceGroup.Label.Example';
import { ChoiceGroupCustomExample } from './ChoiceGroup.Custom.Example';
import { ChoiceGroupImageExample } from './ChoiceGroup.Image.Example';
import { ChoiceGroupIconExample } from './ChoiceGroup.Icon.Example';

const ChoiceGroupBasicExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/ChoiceGroup/ChoiceGroup.Basic.Example.tsx') as string;
const ChoiceGroupControlledExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/ChoiceGroup/ChoiceGroup.Controlled.Example.tsx') as string;
const ChoiceGroupLabelExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/ChoiceGroup/ChoiceGroup.Label.Example.tsx') as string;
const ChoiceGroupCustomExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/ChoiceGroup/ChoiceGroup.Custom.Example.tsx') as string;
const ChoiceGroupImageExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/ChoiceGroup/ChoiceGroup.Image.Example.tsx') as string;
const ChoiceGroupIconExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/ChoiceGroup/ChoiceGroup.Icon.Example.tsx') as string;

export const ChoiceGroupPageProps: IDocPageProps = {
  title: 'ChoiceGroup',
  componentName: 'ChoiceGroup',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-next/src/components/ChoiceGroup',
  examples: [
    {
      title: 'Basic ChoiceGroup',
      code: ChoiceGroupBasicExampleCode,
      view: <ChoiceGroupBasicExample />,
    },
    {
      title: 'Controlled ChoiceGroup',
      code: ChoiceGroupControlledExampleCode,
      view: <ChoiceGroupControlledExample />,
    },
    {
      title: 'ChoiceGroup with images',
      code: ChoiceGroupImageExampleCode,
      view: <ChoiceGroupImageExample />,
    },
    {
      title: 'ChoiceGroup with icons',
      code: ChoiceGroupIconExampleCode,
      view: <ChoiceGroupIconExample />,
    },
    {
      title: 'ChoiceGroup with a custom label',
      code: ChoiceGroupLabelExampleCode,
      view: <ChoiceGroupLabelExample />,
    },
    {
      title: 'ChoiceGroup with custom option rendering',
      code: ChoiceGroupCustomExampleCode,
      view: <ChoiceGroupCustomExample />,
    },
  ],
  overview: require<string>('!raw-loader!@fluentui/examples/src/react-next/ChoiceGroup/docs/ChoiceGroupOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/examples/src/react-next/ChoiceGroup/docs/ChoiceGroupBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
  nativePropsElement: 'input',
};
