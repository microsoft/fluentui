import {
  IColorPickerStyleProps,
  IColorPickerStyles,
  IColorRectangleStyleProps,
  IColorRectangleStyles,
  IColorSliderStyleProps,
  IColorSliderStyles
} from 'office-ui-fabric-react/lib/ColorPicker';

import { NeutralColors } from '../FluentColors';
import { Depths } from '../FluentDepths';
import { fluentBorderRadius } from './styleConstants';

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
  const { palette } = theme;

  return {
    root: {
      border: `1px solid ${palette.neutralLighter}`,
      borderRadius: fluentBorderRadius
    },
    thumb: {
      borderColor: NeutralColors.gray80,
      boxShadow: Depths.depth8
    }
  };
};

export const ColorSliderStyles = (props: IColorSliderStyleProps): Partial<IColorSliderStyles> => {
  return {
    root: {
      borderRadius: fluentBorderRadius,
      marginBottom: 8
    },
    sliderThumb: {
      borderColor: NeutralColors.gray80,
      boxShadow: Depths.depth8
    }
  };
};
