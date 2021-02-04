import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ListPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/List/List.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const ListPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
