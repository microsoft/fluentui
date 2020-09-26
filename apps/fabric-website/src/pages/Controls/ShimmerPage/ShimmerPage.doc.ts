import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ShimmerPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Shimmer/Shimmer.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ShimmerPage/docs/ShimmerRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/fabric-website/src/pages/Controls/ShimmerPage';

export const ShimmerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  ios: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ShimmerPage/docs/ios/ShimmerOverview.md') as string,
    related,
    componentUrl,
  },
};
