import * as React from 'react';
import { SwatchColorPickerBasicExample } from './SwatchColorPicker.Basic.Example';

import { IDocPageProps } from '@fluentui/react-next/lib/common/DocPage.types';

const SwatchColorPickerBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/SwatchColorPicker/SwatchColorPicker.Basic.Example.tsx') as string;

export const SwatchColorPickerPageProps: IDocPageProps = {
  title: 'SwatchColorPicker',
  componentName: 'SwatchColorPicker',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/react-next/src/components/SwatchColorPicker',
  examples: [
    {
      title: 'SwatchColorPicker',
      code: SwatchColorPickerBasicExampleCode,
      view: <SwatchColorPickerBasicExample />,
    },
  ],
  overview: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/react-next/SwatchColorPicker/docs/SwatchColorPickerOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/react-next/SwatchColorPicker/docs/SwatchColorPickerBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
