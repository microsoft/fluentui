import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/BottomNavigationPage/docs/BottomNavigationRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/7.0/apps/fabric-website/src/pages/Controls/BottomNavigationPage';

export const BottomNavigationPageProps: TFabricPlatformPageProps = {
  ios: {
    title: 'Tab Bar',
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/BottomNavigationPage/docs/ios/BottomNavigationOverview.md') as string,
    related,
    componentUrl,
  },
  android: {
    title: 'Bottom Navigation',
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/BottomNavigationPage/docs/android/BottomNavigationOverview.md') as string,
    related,
    componentUrl,
  },
};
