import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { FocusZonePageProps as ExternalProps } from '@fluentui/react-examples/lib/react/FocusZone/FocusZone.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/FocusZonePage/docs/FocusZoneRelated.md') as string;

export const FocusZonePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
