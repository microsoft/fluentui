import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { FocusTrapZonePageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/FocusTrapZone/FocusTrapZone.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const FocusTrapZonePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
