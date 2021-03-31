import { ICheckboxStyleProps, ICheckboxStyles } from '@fluentui/react/lib/Checkbox';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';
import { BaseColors } from '../AzureColors';
import { IsFocusVisibleClassName } from '@fluentui/utilities';
import * as StyleConstants from '../Constants';

export const CheckboxStyles = (props: ICheckboxStyleProps): Partial<ICheckboxStyles> => {
  const { disabled, checked, theme, indeterminate } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    text: [
      {
        fontSize: theme.fonts.medium.fontSize,
        color: semanticColors.bodyText,
        lineHeight: StyleConstants.inputHeight,
      },
      disabled && {
        color: semanticColors.disabledBodyText,
      },
    ],
    checkbox: [
      {
        backgroundColor: semanticColors.bodyBackground,
        borderColor: extendedSemanticColors.checkBoxBorder,
        selectors: {
          '::after': {
            backgroundColor: BaseColors.BLUE_0078D4,
          },
        },
        width: StyleConstants.inputHeight,
        height: StyleConstants.inputHeight,
      },
      checked && {
        backgroundColor: BaseColors.WHITE,
        borderColor: extendedSemanticColors.checkboxBorderChecked,
        selectors: {},
      },
      disabled && {
        borderColor: extendedSemanticColors.checkBoxDisabled,
      },
      disabled &&
        checked && {
          borderColor: extendedSemanticColors.checkBoxDisabled,
          backgroundColor: extendedSemanticColors.checkBoxCheckedDisabledBackground,
        },
    ],
    checkmark: [
      {
        color: extendedSemanticColors.checkBoxCheck,
        selectors: {
          '&:hover': {},
        },
      },
      disabled && {
        color: extendedSemanticColors.checkBoxCheck,
      },
    ],
    root: [
      !disabled && [
        !checked && {
          selectors: {
            ':hover .ms-Checkbox-label .ms-Checkbox-checkbox': {
              borderColor: extendedSemanticColors.buttonText,
            },
            ':hover .ms-Checkbox-label .ms-Checkbox-checkmark': {
              color: extendedSemanticColors.checkBoxCheckHover,
              opacity: '1',
            },
            ':hover .ms-Checkbox-text': {
              color: extendedSemanticColors.checkBoxCheckHoverTest,
            },
          },
        },
        checked && {
          selectors: {
            '.ms-Checkbox-label .ms-Checkbox-checkbox': {
              background: extendedSemanticColors.checkboxBackgroundChecked,
              borderColor: extendedSemanticColors.checkboxBorderChecked,
            },
            ':hover .ms-Checkbox-label .ms-Checkbox-checkbox': {
              borderColor: extendedSemanticColors.checkboxBorderCheckedHovered,
              backgroundColor: extendedSemanticColors.checkboxBackgroundHovered,
            },
            ':hover .ms-Checkbox-text': {
              color: extendedSemanticColors.checkBoxCheckHoverTest,
            },

            ':focus .ms-Checkbox-label .ms-Checkbox-checkbox': {
              borderColor: extendedSemanticColors.focusBorder,
            },
          },
        },
        indeterminate &&
          checked && {
            selectors: {
              '.ms-Checkbox-label .ms-Checkbox-checkbox': {
                background: extendedSemanticColors.checkBoxIndeterminateBackground,
                borderColor: extendedSemanticColors.checkBoxBorder,
              },
              ':hover .ms-Checkbox-label .ms-Checkbox-checkbox': {
                borderColor: extendedSemanticColors.buttonText,
                backgroundColor: 'transparent',
              },
            },
          },
      ],
    ],
    input: {
      [`.${IsFocusVisibleClassName} &:focus + label::before`]: {
        outline: `1px solid ${extendedSemanticColors.checkBoxCheckedFocus}`,
      },
    },
  };
};
