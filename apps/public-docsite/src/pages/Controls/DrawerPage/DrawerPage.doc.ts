import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/DrawerPage/docs/DrawerRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/DrawerPage';

export const DrawerPageProps: TFabricPlatformPageProps = {
  ios: {
    overview: require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/DrawerPage/docs/ios/DrawerOverview.md') as string,
    related,
    componentUrl,
  },
  android: {
    overview: require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/DrawerPage/docs/android/DrawerOverview.md') as string,
    related,
    componentUrl,
  },
};
