import * as React from 'react';
import { ModalBasicExample } from 'office-ui-fabric-react/lib/components/Modal/examples/Modal.Basic.Example';
import { DemoPage } from '../DemoPage';
import { IDemoPageProps } from '../DemoPage.types';
import { ModalStatus } from 'office-ui-fabric-react/lib/components/Modal/Modal.checklist';

const ModalBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Modal/examples/Modal.Basic.Example.tsx') as string;

export const ModalPageProps: IDemoPageProps = {
  title: 'Modal',
  componentName: 'Modal',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Modal',
  componentStatus: ModalStatus,
  examples: [
    {
      title: 'Modal',
      code: ModalBasicExampleCode,
      view: <ModalBasicExample />
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/Modal/Modal.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Modal/docs/ModalOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Modal/docs/ModalDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Modal/docs/ModalDonts.md'),
  isHeaderVisible: true
};

export const ModalPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...ModalPageProps, ...props }} />;
