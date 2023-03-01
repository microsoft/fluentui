import * as React from 'react';
import { SwatchColorPickerBasicExample } from './SwatchColorPicker.Basic.Example';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

const SwatchColorPickerBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/SwatchColorPicker/SwatchColorPicker.Basic.Example.tsx') as string;

export const SwatchColorPickerPageProps: IDocPageProps = {
  title: 'SwatchColorPicker',
  componentName: 'SwatchColorPicker',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/SwatchColorPicker',
  examples: [
    {
      title: 'SwatchColorPicker',
      code: SwatchColorPickerBasicExampleCode,
      view: <SwatchColorPickerBasicExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/SwatchColorPicker/docs/SwatchColorPickerOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/SwatchColorPicker/docs/SwatchColorPickerBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
