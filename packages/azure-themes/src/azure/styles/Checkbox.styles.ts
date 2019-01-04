import { ICheckboxStyleProps, ICheckboxStyles } from 'office-ui-fabric-react/lib/Checkbox';
import { FontSizes } from '../AzureType';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const CheckboxStyles = (props: ICheckboxStyleProps): Partial<ICheckboxStyles> => {
  const { disabled, checked, theme } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    text: [
      {
        fontSize: FontSizes.size12,
        color: semanticColors.bodyText
      },
      disabled && {
        color: semanticColors.disabledBodyText
      }
    ],
    checkbox: [
      {
        backgroundColor: semanticColors.bodyBackground
      },
      checked && {
        borderColor: extendedSemanticColors.controlOutline
      },
      disabled && {
        borderColor: extendedSemanticColors.controlOutlineDisabled
      }
    ],
    checkmark: [
      {
        color: semanticColors.focusBorder
      },
      disabled && {
        color: extendedSemanticColors.controlOutlineDisabled
      }
    ],
    root: [
      !disabled && [
        !checked && {
          selectors: {
            '.ms-Checkbox-label:hover .ms-Checkbox-checkbox': { borderColor: extendedSemanticColors.controlOutlineHovered },
            '.ms-Checkbox-label:hover .ms-Checkbox-checkmark': { color: semanticColors.bodyBackground }
          }
        },
        checked && {
          selectors: {
            ':hover .ms-Checkbox-checkbox': {
              background: semanticColors.bodyBackground,
              borderColor: extendedSemanticColors.controlOutlineHovered
            },
            ':focus .ms-Checkbox-checkbox': {
              background: semanticColors.bodyBackground,
              borderColor: extendedSemanticColors.focusBorder
            }
          }
        }
      ]
    ]
  };
};
