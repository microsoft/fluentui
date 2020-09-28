import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { HoverCardPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/HoverCard/HoverCard.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/HoverCardPage/docs/HoverCardRelated.md') as string;

export const HoverCardPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
