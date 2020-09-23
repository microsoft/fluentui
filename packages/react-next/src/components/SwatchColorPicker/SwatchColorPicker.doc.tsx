import * as React from 'react';
import { SwatchColorPickerBasicExample } from './examples/SwatchColorPicker.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';

const SwatchColorPickerBasicExampleCode = require('!raw-loader!@fluentui/react-next/src/components/SwatchColorPicker/examples/SwatchColorPicker.Basic.Example.tsx') as string;

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
  >('!raw-loader!@fluentui/react-next/src/components/SwatchColorPicker/docs/SwatchColorPickerOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/react-next/src/components/SwatchColorPicker/docs/SwatchColorPickerBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
