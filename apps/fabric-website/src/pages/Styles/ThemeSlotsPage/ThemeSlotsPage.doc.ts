import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const componentUrl =
  'https://github.com/microsoft/fluentui/tree/7.0/apps/fabric-website/src/pages/Styles/ThemeSlotsPage';
const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/ThemeSlotsPage/docs/ThemeSlotsRelated.md');

export const ThemeSlotsPageProps: TFabricPlatformPageProps = {
  web: {
    componentUrl,
    related,
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/ThemeSlotsPage/docs/web/ThemeSlotsOverview.md') as string,
  },
};
