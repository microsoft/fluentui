import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { HoverCardPageProps as ExternalProps } from 'office-ui-fabric-react/lib/packages/react-fundamentals/components/HoverCard/HoverCard.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/HoverCardPage/docs/HoverCardRelated.md') as string;

export const HoverCardPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
