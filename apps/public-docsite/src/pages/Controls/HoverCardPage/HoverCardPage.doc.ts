import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { HoverCardPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/HoverCard/HoverCard.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const HoverCardPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
