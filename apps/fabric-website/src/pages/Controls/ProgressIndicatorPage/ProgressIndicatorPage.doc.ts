import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ProgressIndicatorPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/ProgressIndicator/ProgressIndicator.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ProgressIndicatorPage/docs/ProgressIndicatorRelated.md') as string;
const componentUrl =
  'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/ProgressIndicatorPage';

export const ProgressIndicatorPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  },
  ios: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ProgressIndicatorPage/docs/ios/ProgressIndicatorOverview.md') as string,
    related,
    componentUrl
  }
};
