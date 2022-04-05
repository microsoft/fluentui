import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { NavPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Nav/Nav.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const NavPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
