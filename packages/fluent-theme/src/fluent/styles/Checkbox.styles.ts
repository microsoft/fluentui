import { ICheckboxStyleProps, ICheckboxStyles } from 'office-ui-fabric-react/lib/Checkbox';
import { fluentBorderRadius } from './styleConstants';
import { NeutralColors } from '../FluentColors';

export const CheckboxStyles = (props: ICheckboxStyleProps): ICheckboxStyles => {
  const { disabled, checked, theme } = props;
  const { semanticColors, palette } = theme;

  return {
    checkbox: [
      {
        borderRadius: fluentBorderRadius,
        borderColor: palette.neutralPrimary
      },
      !disabled &&
        checked && {
          borderColor: semanticColors.inputBackgroundChecked
        },
      disabled && {
        borderColor: palette.neutralTertiaryAlt
      },
      checked &&
        disabled && {
          background: palette.neutralTertiaryAlt,
          borderColor: palette.neutralTertiaryAlt
        }
    ],
    checkmark: {
      color: palette.white
    },
    text: {
      color: disabled ? semanticColors.disabledText : semanticColors.bodyText
    },
    root: [
      !disabled && [
        !checked && {
          selectors: {
            ':hover .ms-Checkbox-text': { color: palette.neutralDark },
            ':hover .ms-Checkbox-checkmark': { color: NeutralColors.gray120 } // color not in the palette or semanticColors
          }
        },
        checked && {
          selectors: {
            ':hover .ms-Checkbox-checkbox': {
              background: palette.themeDark,
              borderColor: palette.themeDark
            },
            ':focus .ms-Checkbox-checkbox': {
              background: palette.themeDark,
              borderColor: palette.themeDark
            }
          }
        }
      ]
    ]
  };
};
