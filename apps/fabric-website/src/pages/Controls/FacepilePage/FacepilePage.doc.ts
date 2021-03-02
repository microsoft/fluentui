import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { FacepilePageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Facepile/Facepile.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const FacepilePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
