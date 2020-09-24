import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { TogglePageProps as ExternalProps } from '@fluentui/examples/lib/office-ui-fabric-react/Toggle/Toggle.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/TogglePage/docs/ToggleRelated.md') as string;

export const TogglePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
