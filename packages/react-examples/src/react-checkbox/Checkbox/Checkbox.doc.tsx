import * as React from 'react';
import { CheckboxBasicExample } from './Checkbox.Basic.Example';
import { CheckboxIndeterminateExample } from './Checkbox.Indeterminate.Example';
import { CheckboxOtherExample } from './Checkbox.Other.Example';

import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';

const CheckboxBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-checkbox/Checkbox/Checkbox.Basic.Example.tsx') as string;
const CheckboxOtherExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-checkbox/Checkbox/Checkbox.Other.Example.tsx') as string;
const CheckboxIndeterminateExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-checkbox/Checkbox/Checkbox.Indeterminate.Example.tsx') as string;

export const CheckboxPageProps: IDocPageProps = {
  title: 'Checkbox',
  componentName: 'Checkbox',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/7.0/packages/@fluentui/react-checkbox/src/components/Checkbox',
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
  overview: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/react-checkbox/Checkbox/docs/CheckboxOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/react-checkbox/Checkbox/docs/CheckboxBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
