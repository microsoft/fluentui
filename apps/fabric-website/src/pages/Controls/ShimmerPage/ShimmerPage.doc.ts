import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ShimmerPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Shimmer/Shimmer.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [
  { text: 'Web Shimmer', url: '#/controls/web/shimmer' },
  { text: 'iOS Shimmer', url: '#/controls/ios/shimmer' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/7.0/apps/fabric-website/src/pages/Controls/ShimmerPage';

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
