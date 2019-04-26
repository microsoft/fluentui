import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { FocusTrapZonePageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/FocusTrapZone/FocusTrapZone.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/FocusTrapZoneUtilityPage/docs/FocusTrapZoneUtilityRelated.md') as string;

export const FocusTrapZoneUtilityPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
