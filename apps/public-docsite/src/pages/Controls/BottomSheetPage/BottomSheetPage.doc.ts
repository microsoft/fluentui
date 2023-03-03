import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [
  { text: 'Android Drawer', url: '#/controls/android/drawer' },
  { text: 'Android PopupMenu', url: '#/controls/android/popupmenu' },
  { text: 'iOS PopupMenu', url: '#/controls/ios/popupmenu' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/BottomSheetPage';

export const BottomSheetPageProps: TFabricPlatformPageProps = {
  android: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/BottomSheetPage/docs/android/BottomSheetOverview.md') as string,
    related,
    componentUrl,
  },
};
