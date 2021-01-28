import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ThemePageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Theme/Theme.doc';

const related = require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/ThemesPage/docs/ThemesRelated.md') as string;

export const ThemesPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
