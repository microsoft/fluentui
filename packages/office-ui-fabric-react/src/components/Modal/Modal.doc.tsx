import * as React from 'react';
import { ModalBasicExample } from './examples/Modal.Basic.Example';
import { ModalModelessExample } from './examples/Modal.Modeless.Example';

import { IDocPageProps } from '../../common/DocPage.types';

const ModalBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Modal/examples/Modal.Basic.Example.tsx') as string;
const ModalModelessExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Modal/examples/Modal.Modeless.Example.tsx') as string;

export const ModalPageProps: IDocPageProps = {
  title: 'Modal',
  componentName: 'Modal',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Modal',
  examples: [
    {
      title: 'Modal',
      code: ModalBasicExampleCode,
      view: <ModalBasicExample />
    },
    {
      title: 'Modeless Modal',
      code: ModalModelessExampleCode,
      view: <ModalModelessExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Modal/docs/ModalOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Modal/docs/ModalDos.md'),
  accessibility: require<string>('!raw-loader!office-ui-fabric-react/src/components/Modal/docs/ModalA11y.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Modal/docs/ModalDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
