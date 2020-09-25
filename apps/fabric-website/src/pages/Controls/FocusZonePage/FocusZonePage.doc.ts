import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { FocusZonePageProps as ExternalProps } from '@fluentui/examples/lib/office-ui-fabric-react/FocusZone/FocusZone.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/FocusZonePage/docs/FocusZoneRelated.md') as string;

export const FocusZonePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
