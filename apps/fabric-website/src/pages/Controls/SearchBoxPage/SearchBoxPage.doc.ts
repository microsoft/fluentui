import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SearchBoxPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/SearchBox/SearchBox.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const SearchBoxPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
