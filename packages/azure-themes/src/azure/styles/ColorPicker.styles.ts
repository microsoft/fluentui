import {
  IColorPickerStyleProps,
  IColorPickerStyles,
  IColorRectangleStyleProps,
  IColorRectangleStyles,
  IColorSliderStyleProps,
  IColorSliderStyles,
} from '@fluentui/react/lib/ColorPicker';
import { Depths } from '../AzureDepths';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const ColorPickerStyles = (props: IColorPickerStyleProps): Partial<IColorPickerStyles> => {
  return {
    input: {
      selectors: {
        '&.ms-TextField': {
          paddingRight: 4,
        },
        '.ms-TextField-field': {
          minWidth: 'auto',
          padding: 5,
          textOverflow: 'clip',
        },
      },
    },
    table: {
      selectors: {
        'tbody td:last-of-type .ms-ColorPicker-input': {
          paddingRight: 0,
        },
      },
    },
    tableHeader: {
      selectors: {
        td: {
          paddingBottom: 4,
        },
      },
    },
  };
};

export const ColorRectangleStyles = (props: IColorRectangleStyleProps): Partial<IColorRectangleStyles> => {
  const { theme } = props;
  const semanticColors = theme.semanticColors as IExtendedSemanticColors;

  return {
    root: {
      border: `1px solid ${semanticColors.controlOutline}`,
    },
    thumb: {
      borderColor: semanticColors.controlOutline,
      boxShadow: Depths.depth8,
    },
  };
};

export const ColorSliderStyles = (props: IColorSliderStyleProps): Partial<IColorSliderStyles> => {
  const { theme } = props;
  const semanticColors = theme.semanticColors as IExtendedSemanticColors;

  return {
    sliderThumb: {
      borderColor: semanticColors.controlOutline,
      boxShadow: Depths.depth8,
    },
  };
};
