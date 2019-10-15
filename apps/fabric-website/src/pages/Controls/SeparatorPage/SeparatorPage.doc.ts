import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SeparatorPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Separator/Separator.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/SeparatorPage/docs/SeparatorRelated.md') as string;
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/SeparatorPage';

export const SeparatorPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  },
  ios: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/SeparatorPage/docs/ios/SeparatorOverview.md') as string,
    related,
    componentUrl
  },
  android: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/SeparatorPage/docs/android/SeparatorOverview.md') as string,
    related,
    componentUrl
  }
};
