import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ThemeProviderPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-theme-provider/ThemeProvider/ThemeProvider.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/ThemeProviderPage/docs/ThemeProviderRelated.md') as string;

export const ThemeProviderProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
