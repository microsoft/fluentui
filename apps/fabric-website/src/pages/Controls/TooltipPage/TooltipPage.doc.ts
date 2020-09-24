import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { TooltipPageProps as ExternalProps } from '@fluentui/examples/lib/office-ui-fabric-react/Tooltip/Tooltip.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/TooltipPage/docs/TooltipRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/fabric-website/src/pages/Controls/TooltipPage';

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
