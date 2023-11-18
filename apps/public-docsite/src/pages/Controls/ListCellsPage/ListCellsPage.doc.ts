import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [
  { text: 'Android List Cells', url: '#/controls/android/listcells' },
  { text: 'iOS List Cells', url: '#/controls/ios/listcells' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/ListCellsPage';

export const ListCellsPageProps: TFabricPlatformPageProps = {
  ios: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/ListCellsPage/docs/ios/ListCellsOverview.md') as string,
    related,
    componentUrl,
  },
  android: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/ListCellsPage/docs/android/ListCellsOverview.md') as string,
    related,
    componentUrl,
  },
};
