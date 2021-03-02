import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { MarqueeSelectionPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/MarqueeSelection/MarqueeSelection.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const MarqueeSelectionPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
