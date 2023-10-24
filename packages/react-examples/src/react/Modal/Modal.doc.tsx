import * as React from 'react';
import { ModalBasicExample } from './Modal.Basic.Example';
import { ModalModelessExample } from './Modal.Modeless.Example';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

const ModalBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Modal/Modal.Basic.Example.tsx') as string;
const ModalModelessExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Modal/Modal.Modeless.Example.tsx') as string;

export const ModalPageProps: IDocPageProps = {
  title: 'Modal',
  componentName: 'Modal',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Modal',
  examples: [
    {
      title: 'Modal',
      code: ModalBasicExampleCode,
      view: <ModalBasicExample />,
    },
    {
      title: 'Modeless Modal',
      code: ModalModelessExampleCode,
      view: <ModalModelessExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Modal/docs/ModalOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Modal/docs/ModalBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
