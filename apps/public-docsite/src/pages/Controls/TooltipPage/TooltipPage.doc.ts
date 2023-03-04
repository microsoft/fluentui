import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { TooltipPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Tooltip/Tooltip.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [
  { text: 'Web Tooltip', url: '#/controls/web/tooltip' },
  { text: 'Android Tooltip', url: '#/controls/android/tooltip' },
  { text: 'iOS Tooltip', url: '#/controls/iOS/tooltip' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/TooltipPage';

export const TooltipPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  android: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/TooltipPage/docs/android/TooltipOverview.md') as string,
    related,
    componentUrl,
  },
  ios: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/TooltipPage/docs/ios/TooltipOverview.md') as string,
    related,
    componentUrl,
  },
};
