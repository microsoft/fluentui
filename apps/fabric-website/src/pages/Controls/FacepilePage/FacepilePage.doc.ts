import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { FacepilePageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Facepile/Facepile.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/FacepilePage/docs/FacepileRelated.md') as string;

export const FacepilePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
