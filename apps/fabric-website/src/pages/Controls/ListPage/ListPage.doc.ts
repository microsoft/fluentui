import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ListPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/List/List.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const ListPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
