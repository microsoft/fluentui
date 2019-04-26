import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { FocusZonePageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/FocusZone/FocusZone.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/FocusZoneUtilityPage/docs/FocusZoneUtilityRelated.md') as string;

export const FocusZoneUtilityPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
