import { ICheckboxStyleProps, ICheckboxStyles } from 'office-ui-fabric-react/lib/Checkbox';
import { FontSizes } from '../AzureType';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';
import { divProperties } from 'office-ui-fabric-react';

export const CheckboxStyles = (props: ICheckboxStyleProps): Partial<ICheckboxStyles> => {
  const { disabled, checked, theme, indeterminate } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    text: [
      {
        fontSize: FontSizes.size13,
        color: semanticColors.bodyText,
      },
      disabled && {
        color: semanticColors.iconButtonDisabledColor,
      },
    ],
    checkbox: [
      {
        backgroundColor: semanticColors.bodyBackground,
        borderColor: semanticColors.checkboxBorder,
        selectors: {
          '::after': {
            backgroundColor: '#0078D4',
          },
        },
      },
      checked && {
        backgroundColor: '#ffffff',
        borderColor: extendedSemanticColors.controlOutline,
        selectors: {},
      },
      disabled && {
        borderColor: semanticColors.checkboxBorderDisabled,
      },
      disabled &&
        checked && {
          backgroundColor: semanticColors.checkboxCheckedDisabled,
        },
    ],
    checkmark: [
      {
        color: semanticColors.checkMarkFill,
      },
      disabled && {
        color: semanticColors.checkboxCheckedMarkDisabled,
      },
    ],
    root: [
      !disabled && [
        !checked && {
          selectors: {
            ':hover .ms-Checkbox-label .ms-Checkbox-checkbox': {
              borderColor: extendedSemanticColors.controlOutlineHovered,
            },
            ':hover .ms-Checkbox-label .ms-Checkbox-checkmark': {
              opacity: '1',
              color: semanticColors.checkmarkColorHover,
            },
          },
        },
        checked && {
          selectors: {
            '.ms-Checkbox-label .ms-Checkbox-checkbox': {
              background: '#0078D4',
              borderColor: '#0078D4',
            },
            ':hover .ms-Checkbox-label .ms-Checkbox-checkbox': {
              borderColor: '#005A9E',
              backgroundColor: '#005A9E',
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
                background: semanticColors.checkboxIndeterminateBackground,
                borderColor: semanticColors.checkboxBorder,
              },
              ':hover .ms-Checkbox-label .ms-Checkbox-checkbox': {
                borderColor: extendedSemanticColors.controlOutlineHovered,
                backgroundColor: 'transparent',
              },
            },
          },
      ],
    ],
  };
};
