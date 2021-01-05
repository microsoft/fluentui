import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { TooltipPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Tooltip/Tooltip.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/TooltipPage/docs/TooltipRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/TooltipPage';

export const TooltipPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  android: {
    overview: require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/TooltipPage/docs/android/TooltipOverview.md') as string,
    related,
    componentUrl,
  },
  ios: {
    overview: require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/TooltipPage/docs/ios/TooltipOverview.md') as string,
    related,
    componentUrl,
  },
};
