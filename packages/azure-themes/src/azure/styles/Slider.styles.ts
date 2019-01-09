import { ISliderStyleProps, ISliderStyles } from 'office-ui-fabric-react/lib/Slider';
import * as StyleConstants from '../Constants';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const SliderStyles = (props: ISliderStyleProps): Partial<ISliderStyles> => {
  const { disabled, theme } = props;
  const semanticColors = theme.semanticColors as IExtendedSemanticColors;

  return {
    activeSection: [
      !disabled && {
        backgroundColor: semanticColors.controlOutline
      },
      disabled && {
        background: semanticColors.controlOutlineDisabled
      }
    ],
    inactiveSection: [
      !disabled && {
        background: semanticColors.controlOutline
      },
      disabled && {
        background: semanticColors.controlOutlineDisabled
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
