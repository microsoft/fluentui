import { IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';
import * as StyleConstants from '../Constants';

export const ChoiceGroupOptionStyles = (props: IChoiceGroupOptionStyleProps): Partial<IChoiceGroupOptionStyles> => {
  const { checked, disabled, theme, hasIcon, hasImage } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;
  return {
    root: {
      fontSize: theme.fonts.medium.fontSize,
      color: extendedSemanticColors.labelText,
      backgroundColor: semanticColors.bodyBackground,
      selectors: {
        '.ms-ChoiceFieldLabel': {
          fontSize: theme.fonts.medium.fontSize,
          verticalAlign: 'middle',
        },
        '.is-inFocus': {
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
              borderColor: extendedSemanticColors.controlOutline,
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
            },
            checked &&
              disabled && {
                borderColor: extendedSemanticColors.controlOutlineDisabled,
              },
          ],
          ':hover': [
            (hasIcon || hasImage) && {
              borderColor: extendedSemanticColors.controlOutlineHovered,
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
                },
              },
            },
            !disabled &&
              checked && {
                selectors: {
                  ':before': {
                    borderColor: extendedSemanticColors.primaryButtonBackgroundPressed,
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
