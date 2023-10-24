import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ShimmerPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Shimmer/Shimmer.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [
  { text: 'Web Shimmer', url: '#/controls/web/shimmer' },
  { text: 'iOS Shimmer', url: '#/controls/ios/shimmer' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/ShimmerPage';

export const ShimmerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  ios: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/ShimmerPage/docs/ios/ShimmerOverview.md') as string,
    related,
    componentUrl,
  },
};
