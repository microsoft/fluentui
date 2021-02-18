import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [
  { text: 'iOS PopupMenu', url: '#/controls/ios/popupmenu' },
  { text: 'iOS Drawer', url: '#/controls/ios/drawer' },
  { text: 'Android PopupMenu', url: '#/controls/android/popupmenu' },
  { text: 'Android BottomSheet', url: '#/controls/android/bottomsheet' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/7.0/apps/fabric-website/src/pages/Controls/PopupMenuPage';

export const PopupMenuPageProps: TFabricPlatformPageProps = {
  ios: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PopupMenuPage/docs/ios/PopupMenuOverview.md') as string,
    related,
    componentUrl,
  },
  android: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PopupMenuPage/docs/android/PopupMenuOverview.md') as string,
    related,
    componentUrl,
  },
};
