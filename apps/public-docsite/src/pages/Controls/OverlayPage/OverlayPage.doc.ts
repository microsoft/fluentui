import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { OverlayPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Overlay/Overlay.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const OverlayPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
