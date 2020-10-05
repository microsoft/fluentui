import * as React from 'react';
import { ToggleBasicExample } from './Toggle.Basic.Example';
import { ToggleCustomLabelExample } from './Toggle.CustomLabel.Example';

import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';

const ToggleBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Toggle/Toggle.Basic.Example.tsx') as string;
const ToggleCustomLabelExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Toggle/Toggle.CustomLabel.Example.tsx') as string;

export const TogglePageProps: IDocPageProps = {
  title: 'Toggle',
  componentName: 'Toggle',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/7.0/packages/office-ui-fabric-react/src/components/Toggle',
  examples: [
    {
      title: 'Basic Toggles',
      code: ToggleBasicExampleCode,
      view: <ToggleBasicExample />,
    },
    {
      title: 'Toggles with Custom Labels',
      code: ToggleCustomLabelExampleCode,
      view: <ToggleCustomLabelExample />,
    },
  ],
  overview: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Toggle/docs/ToggleOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Toggle/docs/ToggleBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
  nativePropsElement: 'input',
};
