import * as React from 'react';
import { LayerBasicExample } from 'office-ui-fabric-react/lib/components/Layer/examples/Layer.Basic.Example';
import { DemoPage } from '../DemoPage';
import { IDemoPageProps } from '../DemoPage.types';
import { LayerHostedExample } from 'office-ui-fabric-react/lib/components/Layer/examples/Layer.Hosted.Example';
import { LayerCustomizedExample } from 'office-ui-fabric-react/lib/components/Layer/examples/Layer.Customized.Example';
import { LayerStatus } from 'office-ui-fabric-react/lib/components/Layer/Layer.checklist';

const LayerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Layer/examples/Layer.Basic.Example.tsx') as string;
const LayerHostedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Layer/examples/Layer.Hosted.Example.tsx') as string;
const LayerCustomizedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Layer/examples/Layer.Customized.Example.tsx') as string;

export const LayerPageProps: IDemoPageProps = {
  title: 'Layer',
  componentName: 'Layer',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Layer',
  componentStatus: LayerStatus,
  examples: [
    {
      title: 'Basic layered content',
      code: LayerBasicExampleCode,
      view: <LayerBasicExample />
    },
    {
      title: 'Using LayerHost to control projection',
      code: LayerHostedExampleCode,
      view: <LayerHostedExample />
    },
    {
      title: 'Using Customizer to control the default layer behavior',
      code: LayerCustomizedExampleCode,
      view: <LayerCustomizedExample />
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/Layer/Layer.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Layer/docs/LayerOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Layer/docs/LayerDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Layer/docs/LayerDonts.md'),
  isHeaderVisible: true
};

export const LayerPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...LayerPageProps, ...props }} />;
