import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { FocusZonePageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/FocusZone/FocusZone.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/FocusZonePage/docs/FocusZoneRelated.md') as string;

export const FocusZonePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
