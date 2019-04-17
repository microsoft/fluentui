import { ICheckboxStyleProps, ICheckboxStyles } from 'office-ui-fabric-react/lib/Checkbox';

export const CheckboxStyles = (props: ICheckboxStyleProps): Partial<ICheckboxStyles> => {
  const { disabled, checked, theme } = props;
  const { semanticColors, palette, effects } = theme;

  return {
    checkbox: [
      {
        borderRadius: effects.roundedCorner2,
        borderColor: palette.neutralPrimary
      },
      !disabled &&
        checked && {
          borderColor: semanticColors.inputBackgroundChecked // using semanticColor because I am setting a new color above
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
      color: semanticColors.inputForegroundChecked // using semanticColor to override original behavior on checked/disabled
    },
    root: [
      !disabled && [
        !checked && {
          selectors: {
            ':hover .ms-Checkbox-text': { color: palette.neutralDark },
            ':hover .ms-Checkbox-checkmark': { color: palette.neutralSecondary }
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
