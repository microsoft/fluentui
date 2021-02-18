import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { HoverCardPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/HoverCard/HoverCard.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const HoverCardPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
