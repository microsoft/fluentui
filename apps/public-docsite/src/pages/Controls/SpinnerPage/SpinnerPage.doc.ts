import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SpinnerPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Spinner/Spinner.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [
  { text: 'Web Spinner', url: '#/controls/web/spinner' },
  { text: 'iOS Spinner', url: '#/controls/ios/spinner' },
  { text: 'Android Spinner', url: '#/controls/android/spinner' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/SpinnerPage';

export const SpinnerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  ios: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/SpinnerPage/docs/ios/SpinnerOverview.md') as string,
    related,
    componentUrl,
  },
  android: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/SpinnerPage/docs/android/SpinnerOverview.md') as string,
    related,
    componentUrl,
  },
};
