import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const componentUrl =
  'https://github.com/microsoft/fluentui/tree/7.0/apps/fabric-website/src/pages/Styles/ThemeSlotsPage';

export const ThemeSlotsPageProps: TFabricPlatformPageProps = {
  web: {
    componentUrl,
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/ThemeSlotsPage/docs/web/ThemeSlotsOverview.md') as string,
  },
};
