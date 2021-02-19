import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { LayerPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Layer/Layer.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const LayerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
