import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/ListCellsPage/docs/ListCellsRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/ListCellsPage';

export const ListCellsPageProps: TFabricPlatformPageProps = {
  ios: {
    overview: require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/ListCellsPage/docs/ios/ListCellsOverview.md') as string,
    related,
    componentUrl,
  },
  android: {
    overview: require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/ListCellsPage/docs/android/ListCellsOverview.md') as string,
    related,
    componentUrl,
  },
};
