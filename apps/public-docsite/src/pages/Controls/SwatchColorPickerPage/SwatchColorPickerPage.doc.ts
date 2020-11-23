import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SwatchColorPickerPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/SwatchColorPicker/SwatchColorPicker.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/SwatchColorPickerPage/docs/SwatchColorPickerRelated.md') as string;

export const SwatchColorPickerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
