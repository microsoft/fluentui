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
        ':not(.ms-Slider-disabled).ms-Slider-container:hover .ms-Slider-active': {
          backgroundColor: extendedSemanticColors.sliderActiveHover,
        },
        ':not(.ms-Slider-disabled) .ms-Slider-container:hover .ms-Slider-thumb': {
          borderColor: extendedSemanticColors.sliderActiveHover,
        },
      },
    },
    // left side of bar
    activeSection: [
      !disabled && {
        backgroundColor: extendedSemanticColors.sliderActiveBackground,
      },
      disabled && {
        background: semanticColors.disabledBodyText,
      },
    ],
    // right side of bar
    inactiveSection: [
      !disabled && {
        background: extendedSemanticColors.controlOutlineDisabled,
      },
      disabled && {
        background: semanticColors.disabledBodyText,
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
              borderColor: semanticColors.disabledBodyText,
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
        borderColor: semanticColors.inputBorder,
        borderStyle: StyleConstants.borderSolid,
        borderWidth: StyleConstants.borderWidth,
        color: semanticColors.disabledText,
        textAlign: StyleConstants.textAlignCenter,
        selectors: {
          '&.ms-Slider-value': {
            color: semanticColors.disabledBodyText,
          },
        },
      },
    ],
  };
};
