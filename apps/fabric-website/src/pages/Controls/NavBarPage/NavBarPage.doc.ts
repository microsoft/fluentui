import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/NavBarPage/docs/NavBarRelated.md') as string;
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/NavBarPage';

export const NavBarPageProps: TFabricPlatformPageProps = {
  ios: {
    title: 'Navigation Bar',
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/NavBarPage/docs/ios/NavBarOverview.md') as string,
    related,
    componentUrl
  },
  android: {
    title: 'Top App Bar',
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/NavBarPage/docs/android/NavBarOverview.md') as string,
    related,
    componentUrl
  }
};
