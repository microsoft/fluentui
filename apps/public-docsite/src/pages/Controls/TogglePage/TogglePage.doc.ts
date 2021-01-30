import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { TogglePageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Toggle/Toggle.doc';

const related = require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/TogglePage/docs/ToggleRelated.md') as string;

export const TogglePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
