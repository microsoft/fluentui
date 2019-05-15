import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SwatchColorPickerPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/SwatchColorPicker/SwatchColorPicker.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/SwatchColorPickerPage/docs/SwatchColorPickerRelated.md') as string;

export const SwatchColorPickerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
