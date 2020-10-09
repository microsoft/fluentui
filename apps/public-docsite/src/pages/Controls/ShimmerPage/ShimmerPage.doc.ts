import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ShimmerPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Shimmer/Shimmer.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/ShimmerPage/docs/ShimmerRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/ShimmerPage';

export const ShimmerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  ios: {
    overview: require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/ShimmerPage/docs/ios/ShimmerOverview.md') as string,
    related,
    componentUrl,
  },
};
