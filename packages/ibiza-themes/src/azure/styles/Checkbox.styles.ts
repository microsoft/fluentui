import { ICheckboxStyleProps, ICheckboxStyles } from 'office-ui-fabric-react/lib/Checkbox';
import { FontSizes } from '../AzureType';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const CheckboxStyles = (props: ICheckboxStyleProps): Partial<ICheckboxStyles> => {
  const { disabled, checked, theme } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    text: {
      fontSize: FontSizes.size12
    },
    checkbox: [
      {
        backgroundColor: semanticColors.bodyBackground,
        borderColor: extendedSemanticColors.controlOutline
      },
      disabled && {
        borderColor: extendedSemanticColors.controlOutlineDisabled
      },
      checked && {
        borderColor: extendedSemanticColors.controlOutline
      }
    ],
    checkmark: {
      color: semanticColors.focusBorder
    }
    /*   root: [
        !disabled && [
          !checked && {
            selectors: {
              // ':hover .ms-Checkbox-text': { color: palette.neutralDark },
              // ':hover .ms-Checkbox-checkmark': { color: NeutralColors.gray120 } // color not in the palette or semanticColors
            }
          },
          checked && {
            selectors: {
              ':hover .ms-Checkbox-checkbox': {
                // background: palette.themeDark,
                // borderColor: palette.themeDark
              },
              ':focus .ms-Checkbox-checkbox': {
                // background: palette.themeDark,
                // borderColor: palette.themeDark
              }
            }
          }
        ]
      ] */
  };
};
