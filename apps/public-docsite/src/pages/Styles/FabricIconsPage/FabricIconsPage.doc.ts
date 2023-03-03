import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const title = 'Fluent UI Icons';
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Styles/FabricIconsPage';

export const FabricIconsPageProps: TFabricPlatformPageProps = {
  web: {
    title,
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/FabricIconsPage/docs/web/FabricIconsOverview.md') as string,
    componentUrl,
  },
};
