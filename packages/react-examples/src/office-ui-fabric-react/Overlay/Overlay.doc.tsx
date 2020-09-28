import * as React from 'react';
import { OverlayDarkExample } from './Overlay.Dark.Example';

import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';
import { OverlayLightExample } from './Overlay.Light.Example';

const OverlayLightExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Overlay/Overlay.Light.Example.tsx') as string;
const OverlayDarkExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Overlay/Overlay.Dark.Example.tsx') as string;

export const OverlayPageProps: IDocPageProps = {
  title: 'Overlay',
  componentName: 'Overlay',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/7.0/packages/office-ui-fabric-react/src/components/Overlay',
  examples: [
    {
      title: 'Light',
      code: OverlayLightExampleCode,
      view: <OverlayLightExample />,
    },
    {
      title: 'Dark',
      code: OverlayDarkExampleCode,
      view: <OverlayDarkExample />,
    },
  ],
  overview: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Overlay/docs/OverlayOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Overlay/docs/OverlayBestPractices.md'),
  dos: require<string>('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Overlay/docs/OverlayDos.md'),
  donts: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Overlay/docs/OverlayDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
};
