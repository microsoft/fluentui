import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [
  { text: 'iOS PopupMenu', url: '#/controls/ios/popupmenu' },
  { text: 'iOS Drawer', url: '#/controls/ios/drawer' },
  { text: 'Android PopupMenu', url: '#/controls/android/popupmenu' },
  { text: 'Android BottomSheet', url: '#/controls/android/bottomsheet' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/PopupMenuPage';

export const PopupMenuPageProps: TFabricPlatformPageProps = {
  ios: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/PopupMenuPage/docs/ios/PopupMenuOverview.md') as string,
    related,
    componentUrl,
  },
  android: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/PopupMenuPage/docs/android/PopupMenuOverview.md') as string,
    related,
    componentUrl,
  },
};
