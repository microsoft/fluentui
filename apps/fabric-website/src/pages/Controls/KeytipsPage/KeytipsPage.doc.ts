import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { KeytipsPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Keytip/Keytips.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const KeytipsPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
