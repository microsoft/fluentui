import * as React from 'react';
import { ModalBasicExample } from './examples/Modal.Basic.Example';
import { ModalModelessExample } from './examples/Modal.Modeless.Example';

import { IDocPageProps } from '../../common/DocPage.types';

const ModalBasicExampleCode = require('!raw-loader!@fluentui/react-next/src/components/Modal/examples/Modal.Basic.Example.tsx') as string;
const ModalModelessExampleCode = require('!raw-loader!@fluentui/react-next/src/components/Modal/examples/Modal.Modeless.Example.tsx') as string;

export const ModalPageProps: IDocPageProps = {
  title: 'Modal',
  componentName: 'Modal',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-next/src/components/Modal',
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
  overview: require<string>('!raw-loader!@fluentui/react-next/src/components/Modal/docs/ModalOverview.md'),
  bestPractices: require<string>('!raw-loader!@fluentui/react-next/src/components/Modal/docs/ModalBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
