import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { NavPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Nav/Nav.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const NavPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
