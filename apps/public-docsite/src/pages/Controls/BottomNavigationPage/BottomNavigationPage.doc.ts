import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/BottomNavigationPage/docs/BottomNavigationRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/BottomNavigationPage';

export const BottomNavigationPageProps: TFabricPlatformPageProps = {
  ios: {
    title: 'Tab Bar',
    overview: require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/BottomNavigationPage/docs/ios/BottomNavigationOverview.md') as string,
    related,
    componentUrl,
  },
  android: {
    title: 'Bottom Navigation',
    overview: require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/BottomNavigationPage/docs/android/BottomNavigationOverview.md') as string,
    related,
    componentUrl,
  },
};
