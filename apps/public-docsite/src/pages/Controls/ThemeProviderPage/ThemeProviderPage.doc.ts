import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ThemeProviderPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/ThemeProvider/ThemeProvider.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const ThemeProviderProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
