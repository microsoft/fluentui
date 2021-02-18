import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ColorPickerPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/ColorPicker/ColorPicker.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const ColorPickerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
