import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/DrawerPage/docs/DrawerRelated.md') as string;
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/DrawerPage';

export const DrawerPageProps: TFabricPlatformPageProps = {
  ios: {
    title: 'Drawer',
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/DrawerPage/docs/ios/DrawerOverview.md') as string,
    related,
    componentUrl
  }
};
