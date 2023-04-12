import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Styles/ThemeSlotsPage';
export const ThemeSlotsPageProps: TFabricPlatformPageProps = {
  web: {
    componentUrl,
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/ThemeSlotsPage/docs/web/ThemeSlotsOverview.md') as string,
  },
};
