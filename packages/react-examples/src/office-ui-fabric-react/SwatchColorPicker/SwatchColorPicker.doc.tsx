import * as React from 'react';
import { SwatchColorPickerBasicExample } from './SwatchColorPicker.Basic.Example';

import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';

const SwatchColorPickerBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/SwatchColorPicker/SwatchColorPicker.Basic.Example.tsx') as string;

export const SwatchColorPickerPageProps: IDocPageProps = {
  title: 'SwatchColorPicker',
  componentName: 'SwatchColorPicker',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/7.0/packages/office-ui-fabric-react/src/components/SwatchColorPicker',
  examples: [
    {
      title: 'SwatchColorPicker',
      code: SwatchColorPickerBasicExampleCode,
      view: <SwatchColorPickerBasicExample />,
    },
  ],
  overview: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/SwatchColorPicker/docs/SwatchColorPickerOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/SwatchColorPicker/docs/SwatchColorPickerBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
