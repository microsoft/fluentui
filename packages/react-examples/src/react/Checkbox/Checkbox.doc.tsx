import * as React from 'react';
import { CheckboxBasicExample } from './Checkbox.Basic.Example';
import { CheckboxIndeterminateExample } from './Checkbox.Indeterminate.Example';
import { CheckboxOtherExample } from './Checkbox.Other.Example';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

const CheckboxBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Checkbox/Checkbox.Basic.Example.tsx') as string;
const CheckboxOtherExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Checkbox/Checkbox.Other.Example.tsx') as string;
const CheckboxIndeterminateExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Checkbox/Checkbox.Indeterminate.Example.tsx') as string;

export const CheckboxPageProps: IDocPageProps = {
  title: 'Checkbox',
  componentName: 'Checkbox',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Checkbox',
  examples: [
    {
      title: 'Basic Checkboxes',
      code: CheckboxBasicExampleCode,
      view: <CheckboxBasicExample />,
    },
    {
      title: 'Other Implementation Examples',
      code: CheckboxOtherExampleCode,
      view: <CheckboxOtherExample />,
    },
    {
      title: 'Indeterminate Checkboxes',
      code: CheckboxIndeterminateExampleCode,
      view: <CheckboxIndeterminateExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Checkbox/docs/CheckboxOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Checkbox/docs/CheckboxBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
