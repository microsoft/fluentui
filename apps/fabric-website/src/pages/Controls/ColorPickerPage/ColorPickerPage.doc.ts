import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ColorPickerPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/ColorPicker/ColorPicker.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ColorPickerPage/docs/ColorPickerRelated.md') as string;

export const ColorPickerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
