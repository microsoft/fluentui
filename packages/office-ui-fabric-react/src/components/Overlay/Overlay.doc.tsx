import * as React from 'react';
import { OverlayDarkExample } from './examples/Overlay.Dark.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { OverlayLightExample } from './examples/Overlay.Light.Example';
import { OverlayStatus } from './Overlay.checklist';

const OverlayLightExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Overlay/examples/Overlay.Light.Example.tsx') as string;
const OverlayDarkExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Overlay/examples/Overlay.Dark.Example.tsx') as string;

export const OverlayPageProps: IDocPageProps = {
  title: 'Overlay',
  componentName: 'Overlay',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Overlay',
  componentStatus: OverlayStatus,
  examples: [
    {
      title: 'Light',
      code: OverlayLightExampleCode,
      view: <OverlayLightExample />
    },
    {
      title: 'Dark',
      code: OverlayDarkExampleCode,
      view: <OverlayDarkExample />
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/Overlay/Overlay.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Overlay/docs/OverlayOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Overlay/docs/OverlayDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Overlay/docs/OverlayDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true
};
