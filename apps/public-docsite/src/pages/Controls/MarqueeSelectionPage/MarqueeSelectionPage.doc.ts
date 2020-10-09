import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { MarqueeSelectionPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/MarqueeSelection/MarqueeSelection.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/MarqueeSelectionPage/docs/MarqueeSelectionRelated.md') as string;

export const MarqueeSelectionPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
