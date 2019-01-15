import { ISliderStyleProps, ISliderStyles } from 'office-ui-fabric-react/lib/Slider';
import * as StyleConstants from '../Constants';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const SliderStyles = (props: ISliderStyleProps): Partial<ISliderStyles> => {
  const { disabled, theme, vertical } = props;
  const semanticColors = theme.semanticColors as IExtendedSemanticColors;
  const sliderBoxDimension: string = '8px';
  const sliderDiameter: string = '16px';
  const sliderOffset: string = '2px';
  const sliderLineBorderRadius: string = '0px';

  return {
    activeSection: [
      !disabled && {
        backgroundColor: semanticColors.controlAccent
      },
      disabled && {
        background: semanticColors.disabledBodyText
      }
    ],
    inactiveSection: [
      vertical && {
        width: sliderBoxDimension
      },
      !vertical && {
        width: sliderBoxDimension
      },
      !disabled && {
        background: semanticColors.controlOutlineDisabled
      },
      disabled && {
        background: semanticColors.disabledBodyText
      }
    ],
    slideBox: [
      !vertical && {
        selectors: {
          '.ms-Slider-active': {
            height: sliderBoxDimension,
            borderRadius: sliderLineBorderRadius
          },
          '.ms-Slider-inactive': {
            height: sliderBoxDimension,
            borderRadius: sliderLineBorderRadius
          }
        }
      },
      vertical && {
        selectors: {
          '.ms-Slider-active': {
            width: sliderBoxDimension,
            borderRadius: sliderLineBorderRadius
          },
          '.ms-Slider-inactive': {
            width: sliderBoxDimension,
            borderRadius: sliderLineBorderRadius
          }
        }
      },
      !disabled && {
        selectors: {
          '.ms-Slider-thumb': [
            {
              borderColor: semanticColors.controlAccent,
              height: sliderDiameter,
              width: sliderDiameter
            },
            vertical && {
              marginLeft: sliderOffset
            },
            !vertical && {
              marginTop: sliderOffset
            }
          ]
        }
      },
      disabled && {
        selectors: {
          '.ms-Slider-thumb': [
            {
              borderColor: semanticColors.disabledBodyText,
              height: sliderDiameter,
              width: sliderDiameter
            },
            vertical && {
              marginLeft: sliderOffset
            },
            !vertical && {
              marginTop: sliderOffset
            }
          ]
        }
      }
    ],
    valueLabel: [
      !disabled && {
        borderColor: semanticColors.inputBorder,
        borderStyle: StyleConstants.borderSolid,
        borderWidth: StyleConstants.borderWidth,
        textAlign: StyleConstants.textAlignCenter,
        selectors: {
          '&.ms-Slider-value': {
            color: semanticColors.bodyText
          }
        }
      },
      disabled && {
        borderColor: semanticColors.inputBorder,
        borderStyle: StyleConstants.borderSolid,
        borderWidth: StyleConstants.borderWidth,
        color: semanticColors.disabledText,
        textAlign: StyleConstants.textAlignCenter,
        selectors: {
          '&.ms-Slider-value': {
            color: semanticColors.disabledBodyText
          }
        }
      }
    ]
  };
};
