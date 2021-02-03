import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SearchBoxPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/SearchBox/SearchBox.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const SearchBoxPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
