import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { OverlayPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Overlay/Overlay.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/OverlayPage/docs/OverlayRelated.md') as string;

export const OverlayPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
