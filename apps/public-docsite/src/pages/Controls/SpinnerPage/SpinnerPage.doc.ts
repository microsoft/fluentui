import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SpinnerPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Spinner/Spinner.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/SpinnerPage/docs/SpinnerRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/SpinnerPage';

export const SpinnerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  ios: {
    overview: require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/SpinnerPage/docs/ios/SpinnerOverview.md') as string,
    related,
    componentUrl,
  },
  android: {
    overview: require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/SpinnerPage/docs/android/SpinnerOverview.md') as string,
    related,
    componentUrl,
  },
};
