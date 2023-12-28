import { IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles } from '@fluentui/react/lib/ChoiceGroup';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';
import * as StyleConstants from '../Constants';

export const ChoiceGroupOptionStyles = (props: IChoiceGroupOptionStyleProps): Partial<IChoiceGroupOptionStyles> => {
  const { checked, disabled, theme, hasIcon, hasImage } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;
  return {
    root: {
      fontSize: theme.fonts.medium.fontSize,
      color: semanticColors.bodyText,
      backgroundColor: semanticColors.bodyBackground,
      selectors: {
        '.ms-ChoiceField-wrapper': {
          padding: '4px',
        },
        '.ms-ChoiceFieldLabel': {
          fontSize: theme.fonts.medium.fontSize,
          verticalAlign: 'middle',
        },
        '.is-inFocus': {
          selectors: {
            ':after': {
              border: `1px solid ${extendedSemanticColors.choiceGroupFocusBorder} !important`,
            },
          },
          border: `${extendedSemanticColors.choiceGroupContainerBorder}
          ${extendedSemanticColors.choiceGroupContainerBorderStyle}
          ${extendedSemanticColors.checkboxBorderChecked}`,
        },
      },
    },
    field: [
      {
        selectors: {
          // The circle
          ':before': [
            {
              width: StyleConstants.choiceFieldHeight,
              height: StyleConstants.choiceFieldHeight,
              borderColor: semanticColors.bodyText,
            },
            checked && {
              backgroundColor: 'transparent',
              borderColor: extendedSemanticColors.checkboxBorderChecked,
            },
            disabled && {
              backgroundColor: semanticColors.bodyBackground,
              borderColor: extendedSemanticColors.controlOutlineDisabled,
            },
            (hasIcon || hasImage) &&
              disabled &&
              checked && {
                opacity: 1,
              },
          ],
          // The dot
          ':after': [
            {
              borderColor: extendedSemanticColors.checkboxBorderChecked,
              top: 4,
              left: 4,
            },
            checked &&
              disabled && {
                borderColor: extendedSemanticColors.controlOutlineDisabled,
              },
            checked &&
              (hasIcon || hasImage) && {
                top: 7,
                right: 7,
                left: 'auto',
              },
          ],
          ':hover': [
            (hasIcon || hasImage) && {
              borderColor: extendedSemanticColors.controlOutlineHovered,
              selectors: {
                '::after': {
                  top: 7,
                  right: 7,
                  left: 'auto',
                },
              },
            },
            !disabled && {
              selectors: {
                '.ms-ChoiceFieldLabel': {
                  color: extendedSemanticColors.bodyTextHovered,
                },
                ':before': {
                  borderColor: extendedSemanticColors.controlOutlineHovered,
                },
                ':after': {
                  borderColor: extendedSemanticColors.checkboxBorderChecked,
                  backgroundColor: extendedSemanticColors.choiceGroupUncheckedDotHover,
                  top: 4,
                  left: 4,
                },
              },
            },
            !disabled &&
              checked && {
                selectors: {
                  ':before': {
                    borderColor: extendedSemanticColors.checkboxBorderCheckedHovered,
                  },
                  ':after': {
                    borderColor: extendedSemanticColors.checkboxBorderCheckedHovered,
                    backgroundColor: extendedSemanticColors.choiceGroupUncheckedDotHover,
                  },
                },
              },
          ],
          '.ms-ChoiceFieldLabel': {
            color: disabled ? semanticColors.disabledBodyText : semanticColors.bodyText,
          },
        },
      },
      (hasIcon || hasImage) &&
        !disabled && {
          selectors: {
            i: {
              // discrepency: does icon highlight change color when selected?
              color: checked ? extendedSemanticColors.controlAccent : semanticColors.bodyText,
            },
          },
        },
      (hasIcon || hasImage) && {
        borderWidth: StyleConstants.borderWidth,
        borderColor: checked ? extendedSemanticColors.controlOutline : semanticColors.bodyBackground,
      },
      checked &&
        disabled && {
          borderColor: semanticColors.disabledBodyText,
        },
    ],
  };
};
