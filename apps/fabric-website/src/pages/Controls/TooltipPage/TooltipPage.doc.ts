import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { TooltipPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Tooltip/Tooltip.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [
  { text: 'Web Tooltip', url: '#/controls/web/tooltip' },
  { text: 'Android Tooltip', url: '#/controls/android/tooltip' },
  { text: 'iOS Tooltip', url: '#/controls/iOS/tooltip' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/7.0/apps/fabric-website/src/pages/Controls/TooltipPage';

export const TooltipPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  android: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/TooltipPage/docs/android/TooltipOverview.md') as string,
    related,
    componentUrl,
  },
  ios: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/TooltipPage/docs/ios/TooltipOverview.md') as string,
    related,
    componentUrl,
  },
};
