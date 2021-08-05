import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { MarqueeSelectionPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/MarqueeSelection/MarqueeSelection.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const MarqueeSelectionPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
