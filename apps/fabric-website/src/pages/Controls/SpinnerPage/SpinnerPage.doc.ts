import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SpinnerPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Spinner/Spinner.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/SpinnerPage/docs/SpinnerRelated.md') as string;
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/SpinnerPage';

export const SpinnerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  },
  ios: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/SpinnerPage/docs/ios/SpinnerOverview.md') as string,
    related,
    componentUrl
  },
  android: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/SpinnerPage/docs/android/SpinnerOverview.md') as string,
    related,
    componentUrl
  }
};
