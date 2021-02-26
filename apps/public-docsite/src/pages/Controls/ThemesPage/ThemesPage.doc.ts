import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ThemePageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Theme/Theme.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const ThemesPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
