import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { MarqueeSelectionPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/MarqueeSelection/MarqueeSelection.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/MarqueeSelectionPage/docs/MarqueeSelectionRelated.md') as string;

export const MarqueeSelectionPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
