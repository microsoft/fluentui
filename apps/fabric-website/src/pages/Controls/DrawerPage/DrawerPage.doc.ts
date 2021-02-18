import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [
  { text: 'iOS PopupMenu', url: '#/controls/ios/popupmenu' },
  { text: 'iOS Drawer', url: '#/controls/ios/drawer' },
  { text: 'Android Drawer', url: '#/controls/android/drawer' },
  { text: 'Android BottomSheet', url: '#/controls/android/bottomsheet' },
];
const componentUrl = 'https://github.com/microsoft/fluentui/tree/7.0/apps/fabric-website/src/pages/Controls/DrawerPage';

export const DrawerPageProps: TFabricPlatformPageProps = {
  ios: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/DrawerPage/docs/ios/DrawerOverview.md') as string,
    related,
    componentUrl,
  },
  android: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/DrawerPage/docs/android/DrawerOverview.md') as string,
    related,
    componentUrl,
  },
};
