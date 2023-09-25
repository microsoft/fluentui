import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [
  { text: 'iOS Navigation Bar', url: '#/controls/ios/navigationbar' },
  { text: 'Android Top App Bar', url: '#/controls/android/topappbar' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/NavBarPage';

export const NavBarPageProps: TFabricPlatformPageProps = {
  ios: {
    title: 'Navigation Bar',
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/NavBarPage/docs/ios/NavBarOverview.md') as string,
    related,
    componentUrl,
  },
  android: {
    title: 'Top App Bar',
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/NavBarPage/docs/android/NavBarOverview.md') as string,
    related,
    componentUrl,
  },
};
