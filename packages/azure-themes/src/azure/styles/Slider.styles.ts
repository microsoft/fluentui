import { ISliderStyleProps, ISliderStyles } from '@fluentui/react/lib/Slider';
import * as StyleConstants from '../Constants';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

const SLIDER_BOX_DIMENSION: number = 8;
const SLIDER_DIAMETER: number = 16;
const SLIDER_BORDER_RADIUS: number = 10;

export const SliderStyles = (props: ISliderStyleProps): Partial<ISliderStyles> => {
  const { disabled, theme, vertical } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: {
      selectors: {
        ':not(.ms-Slider-disabled) .ms-Slider-container:hover .ms-Slider-inactive': {
          backgroundColor: extendedSemanticColors.sliderInActiveHover,
        },
        ':not(.ms-Slider-disabled) .ms-Slider-container:hover .ms-Slider-active': {
          backgroundColor: extendedSemanticColors.sliderActiveHover,
        },
        ':not(.ms-Slider-disabled) .ms-Slider-container:hover .ms-Slider-thumb': {
          borderColor: extendedSemanticColors.sliderActiveHover,
        },
        ':not(.ms-Slider-disabled) .ms-Slider-container:active .ms-Slider-inactive': {
          backgroundColor: extendedSemanticColors.sliderInActiveHover,
        },
        ':not(.ms-Slider-disabled) .ms-Slider-container:active .ms-Slider-active': {
          backgroundColor: extendedSemanticColors.sliderActivePressed,
        },
        ':not(.ms-Slider-disabled) .ms-Slider-container:active .ms-Slider-thumb': {
          borderColor: extendedSemanticColors.sliderActivePressed,
        },
      },
    },
    // left side of bar
    activeSection: [
      !disabled && {
        backgroundColor: extendedSemanticColors.sliderActiveBackground,
      },
      disabled && {
        background: extendedSemanticColors.sliderDisabledActiveBackground,
      },
    ],
    // right side of bar
    inactiveSection: [
      !disabled && {
        background: extendedSemanticColors.controlOutlineDisabled,
      },
      disabled && {
        background: extendedSemanticColors.sliderDisabledInActiveBackground,
      },
    ],
    slideBox: [
      !disabled && {
        selectors: {
          '.ms-Slider-thumb': {
            borderColor: extendedSemanticColors.sliderActiveBackground,
            width: SLIDER_DIAMETER,
          },
        },
      },
      disabled && {
        selectors: {
          '.ms-Slider-thumb': [
            {
              borderColor: extendedSemanticColors.sliderDisabledActiveBackground,
              width: SLIDER_DIAMETER,
            },
          ],
        },
      },
    ],
    line: [
      !vertical && {
        selectors: {
          '.ms-Slider-active': {
            borderRadius: SLIDER_BORDER_RADIUS,
          },
          '.ms-Slider-inactive': {
            borderRadius: SLIDER_BORDER_RADIUS,
          },
        },
      },
      vertical && {
        selectors: {
          '.ms-Slider-active': {
            width: SLIDER_BOX_DIMENSION,
            borderRadius: SLIDER_BORDER_RADIUS,
          },
          '.ms-Slider-inactive': {
            width: SLIDER_BOX_DIMENSION,
            borderRadius: SLIDER_BORDER_RADIUS,
          },
        },
      },
    ],
    valueLabel: [
      !disabled && {
        borderColor: semanticColors.inputBorder,
        borderStyle: StyleConstants.borderSolid,
        borderWidth: StyleConstants.borderWidth,
        textAlign: StyleConstants.textAlignCenter,
        selectors: {
          '&.ms-Slider-value': {
            color: semanticColors.bodyText,
            borderRadius: StyleConstants.borderRadius,
          },
        },
      },
      disabled && {
        borderColor: extendedSemanticColors.controlOutlineDisabled,
        borderStyle: StyleConstants.borderSolid,
        borderWidth: StyleConstants.borderWidth,
        textAlign: StyleConstants.textAlignCenter,
        selectors: {
          '&.ms-Slider-value': {
            color: extendedSemanticColors.sliderDisabledActiveBackground,
            borderRadius: StyleConstants.borderRadius,
          },
        },
      },
    ],
  };
};
