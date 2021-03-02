import { ISliderStyleProps, ISliderStyles } from '@fluentui/react/lib/Slider';
import * as StyleConstants from '../Constants';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

const SLIDER_BOX_DIMENSION: number = 8;
const SLIDER_DIAMETER: number = 16;
const SLIDER_OFFSET: number = 2;
const SLIDER_BORDER_RADIUS: number = 0;

export const SliderStyles = (props: ISliderStyleProps): Partial<ISliderStyles> => {
  const { disabled, theme, vertical } = props;
  const semanticColors = theme.semanticColors as IExtendedSemanticColors;

  return {
    activeSection: [
      !disabled && {
        backgroundColor: semanticColors.controlAccent,
      },
      disabled && {
        background: semanticColors.disabledBodyText,
      },
    ],
    inactiveSection: [
      !disabled && {
        background: semanticColors.controlOutlineDisabled,
      },
      disabled && {
        background: semanticColors.disabledBodyText,
      },
    ],
    slideBox: [
      !disabled && {
        selectors: {
          '.ms-Slider-thumb': [
            {
              borderColor: semanticColors.controlAccent,
              height: SLIDER_DIAMETER,
              width: SLIDER_DIAMETER,
            },
            vertical && {
              marginLeft: SLIDER_OFFSET,
            },
            !vertical && {
              marginTop: SLIDER_OFFSET,
            },
          ],
        },
      },
      disabled && {
        selectors: {
          '.ms-Slider-thumb': [
            {
              borderColor: semanticColors.disabledBodyText,
              height: SLIDER_DIAMETER,
              width: SLIDER_DIAMETER,
            },
            vertical && {
              marginLeft: SLIDER_OFFSET,
            },
            !vertical && {
              marginTop: SLIDER_OFFSET,
            },
          ],
        },
      },
    ],
    line: [
      !vertical && {
        selectors: {
          '.ms-Slider-active': {
            height: SLIDER_BOX_DIMENSION,
            borderRadius: SLIDER_BORDER_RADIUS,
          },
          '.ms-Slider-inactive': {
            height: SLIDER_BOX_DIMENSION,
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
