import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ScrollablePanePageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/ScrollablePane/ScrollablePane.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const ScrollablePanePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
