import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/DrawerPage/docs/DrawerRelated.md') as string;
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/DrawerPage';

export const DrawerPageProps: TFabricPlatformPageProps = {
  ios: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/DrawerPage/docs/ios/DrawerOverview.md') as string,
    related,
    componentUrl
  },
  android: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/DrawerPage/docs/android/DrawerOverview.md') as string,
    related,
    componentUrl
  }
};
