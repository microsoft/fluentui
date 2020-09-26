import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { MarqueeSelectionPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/MarqueeSelection/MarqueeSelection.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/MarqueeSelectionPage/docs/MarqueeSelectionRelated.md') as string;

export const MarqueeSelectionPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
