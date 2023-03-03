import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const title = 'Styles';
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Overviews/StylesPage';

export const StylesPageProps: TFabricPlatformPageProps = {
  web: {
    title,
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/StylesPage/docs/web/StylesOverview.md') as string,
    componentUrl,
  },
};
