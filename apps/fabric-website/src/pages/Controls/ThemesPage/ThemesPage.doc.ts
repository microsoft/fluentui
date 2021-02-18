import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ThemePageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Theme/Theme.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const ThemesPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
