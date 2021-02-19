import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [
  { text: 'iOS Tab Bar', url: '#/controls/ios/tabbar' },
  { text: 'Android Bottom Navigation', url: '#/controls/android/bottomnavigation' },
];
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
