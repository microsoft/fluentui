import * as React from 'react';
import { SwatchColorPickerBasicExample } from './examples/SwatchColorPicker.Basic.Example';

import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';

const SwatchColorPickerBasicExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/SwatchColorPicker/examples/SwatchColorPicker.Basic.Example.tsx') as string;

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
  >('!raw-loader!@fluentui/examples/src/react-next/SwatchColorPicker/docs/SwatchColorPickerOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!@fluentui/examples/src/react-next/SwatchColorPicker/docs/SwatchColorPickerDos.md'),
  donts: require<
    string
  >('!raw-loader!@fluentui/examples/src/react-next/SwatchColorPicker/docs/SwatchColorPickerDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
