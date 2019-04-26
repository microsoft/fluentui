import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { TooltipPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Tooltip/Tooltip.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/TooltipPage/docs/TooltipRelated.md') as string;

export const TooltipPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
