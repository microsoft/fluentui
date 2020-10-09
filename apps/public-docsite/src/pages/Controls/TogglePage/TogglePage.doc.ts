import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { TogglePageProps as ExternalProps } from '@fluentui/react-examples/lib/react-toggle/Toggle/Toggle.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/TogglePage/docs/ToggleRelated.md') as string;

export const TogglePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
