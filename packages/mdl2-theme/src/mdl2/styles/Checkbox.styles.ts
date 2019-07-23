import { ICheckboxStyleProps, ICheckboxStyles } from 'office-ui-fabric-react/lib/Checkbox';

export const CheckboxStyles = (props: ICheckboxStyleProps): Partial<ICheckboxStyles> => {
  const { disabled, checked, theme } = props;
  const { semanticColors, palette } = theme;

  return {
    checkbox: [
      !disabled &&
        !checked && {
          borderColor: semanticColors.smallInputBorder
        }
    ],
    checkmark: {
      color: semanticColors.inputForegroundChecked // using semanticColor to override original behavior on checked/disabled
    },
    root: [
      !disabled && [
        !checked && {
          selectors: {
            ':hover .ms-Checkbox-text': { color: palette.neutralPrimary },
            ':hover .ms-Checkbox-checkmark': { color: palette.neutralSecondary }
          }
        },
        checked && {
          selectors: {
            ':hover .ms-Checkbox-checkbox': {
              background: palette.themeDarkAlt,
              borderColor: palette.themeDarkAlt
            },
            ':focus .ms-Checkbox-checkbox': {
              background: palette.themeDarkAlt,
              borderColor: palette.themeDarkAlt
            }
          }
        }
      ]
    ]
  };
};
