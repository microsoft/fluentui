import {
  IColorPickerStyleProps,
  IColorPickerStyles,
  IColorRectangleStyleProps,
  IColorRectangleStyles,
  IColorSliderStyleProps,
  IColorSliderStyles
} from 'office-ui-fabric-react/lib/ColorPicker';

export const ColorPickerStyles = (props: IColorPickerStyleProps): Partial<IColorPickerStyles> => {
  return {
    input: {
      selectors: {
        '&.ms-TextField': {
          paddingRight: 4
        },
        '.ms-TextField-field': {
          minWidth: 'auto',
          padding: 5,
          textOverflow: 'clip'
        }
      }
    },
    table: {
      selectors: {
        'tbody td:last-of-type .ms-ColorPicker-input': {
          paddingRight: 0
        }
      }
    },
    tableHeader: {
      selectors: {
        td: {
          paddingBottom: 4
        }
      }
    }
  };
};

export const ColorRectangleStyles = (props: IColorRectangleStyleProps): Partial<IColorRectangleStyles> => {
  const { theme } = props;
  const { palette, effects } = theme;

  return {
    root: {
      border: `1px solid ${palette.neutralLighter}`,
      borderRadius: effects.roundedCorner2
    },
    thumb: {
      borderColor: palette.neutralTertiary,
      boxShadow: effects.elevation8
    }
  };
};

export const ColorSliderStyles = (props: IColorSliderStyleProps): Partial<IColorSliderStyles> => {
  const { theme } = props;
  const { palette, effects } = theme;

  return {
    root: {
      borderRadius: effects.roundedCorner2,
      marginBottom: 8
    },
    sliderThumb: {
      borderColor: palette.neutralTertiary,
      boxShadow: effects.elevation8
    }
  };
};
