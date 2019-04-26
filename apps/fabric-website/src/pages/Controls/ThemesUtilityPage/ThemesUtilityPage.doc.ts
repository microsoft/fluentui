import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ThemePageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Theme/Theme.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ThemesUtilityPage/docs/ThemesUtilityRelated.md') as string;

export const ThemesUtilityPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
