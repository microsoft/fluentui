import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SwatchColorPickerPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/SwatchColorPicker/SwatchColorPicker.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const SwatchColorPickerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
