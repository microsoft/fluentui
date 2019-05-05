import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ThemePageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Theme/Theme.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ThemesPage/docs/ThemesRelated.md') as string;

export const ThemesPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
