import * as React from 'react';
import { LayerBasicExample } from './Layer.Basic.Example';

import { IDocPageProps } from '@fluentui/react-next/lib/common/DocPage.types';
import { LayerHostedExample } from './Layer.Hosted.Example';
import { LayerCustomizedExample } from './Layer.Customized.Example';
import { LayerNestedLayersExample } from './Layer.NestedLayers.Example';

const LayerBasicExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/Layer/Layer.Basic.Example.tsx') as string;
const LayerHostedExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/Layer/Layer.Hosted.Example.tsx') as string;
const LayerCustomizedExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/Layer/Layer.Customized.Example.tsx') as string;
const LayerNestedLayersExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/Layer/Layer.NestedLayers.Example.tsx') as string;

export const LayerPageProps: IDocPageProps = {
  title: 'Layer',
  componentName: 'Layer',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/@fluentui/react-next/src/components/Layer',
  examples: [
    {
      title: 'Basic layered content',
      code: LayerBasicExampleCode,
      view: <LayerBasicExample />,
    },
    {
      title: 'Using LayerHost to control projection',
      code: LayerHostedExampleCode,
      view: <LayerHostedExample />,
    },
    {
      title: 'Using Customizer to control the default layer behavior',
      code: LayerCustomizedExampleCode,
      view: <LayerCustomizedExample />,
    },
    {
      title: 'Nested Layers Example',
      code: LayerNestedLayersExampleCode,
      view: <LayerNestedLayersExample />,
    },
  ],
  overview: require<string>('!raw-loader!@fluentui/examples/src/react-next/Layer/docs/LayerOverview.md'),
  bestPractices: require<string>('!raw-loader!@fluentui/examples/src/react-next/Layer/docs/LayerBestPractices.md'),
  dos: require<string>('!raw-loader!@fluentui/examples/src/react-next/Layer/docs/LayerDos.md'),
  donts: require<string>('!raw-loader!@fluentui/examples/src/react-next/Layer/docs/LayerDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
