import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ColorPickerPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/ColorPicker/ColorPicker.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const ColorPickerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
