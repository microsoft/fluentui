import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';
import { PopupBasicExample } from './Popup.Basic.Example';
import { PopupModalExample } from './Popup.Modal.Example';

const PopupBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Popup/Popup.Basic.Example.tsx') as string;
const PopupModalExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Popup/Popup.Modal.Example.tsx') as string;

export const PopupPageProps: IDocPageProps = {
  title: 'Popup',
  componentName: 'Popup',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Popup',
  examples: [
    {
      title: 'Basic',
      code: PopupBasicExampleCode,
      view: <PopupBasicExample />,
    },
    {
      title: 'Modal',
      code: PopupModalExampleCode,
      view: <PopupModalExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Popup/docs/PopupOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Popup/docs/PopupBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Popup/docs/PopupDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Popup/docs/PopupDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
};
