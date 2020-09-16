import * as React from 'react';
import { ModalBasicExample } from './examples/Modal.Basic.Example';
import { ModalModelessExample } from './examples/Modal.Modeless.Example';

import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';

const ModalBasicExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Modal/examples/Modal.Basic.Example.tsx') as string;
const ModalModelessExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Modal/examples/Modal.Modeless.Example.tsx') as string;

export const ModalPageProps: IDocPageProps = {
  title: 'Modal',
  componentName: 'Modal',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Modal',
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
  overview: require<string>('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Modal/docs/ModalOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Modal/docs/ModalBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
