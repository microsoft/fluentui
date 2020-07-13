import { IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';
import { FontSizes } from '../AzureType';
import * as StyleConstants from '../Constants';

export const ChoiceGroupOptionStyles = (props: IChoiceGroupOptionStyleProps): Partial<IChoiceGroupOptionStyles> => {
  const { checked, disabled, theme, hasIcon, hasImage } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;
  return {
    root: {
      fontSize: FontSizes.size13,
      color: extendedSemanticColors.labelText,
      backgroundColor: semanticColors.bodyBackground,
      selectors: {
        '.ms-ChoiceFieldLabel': {
          color: semanticColors.bodyText,
          fontSize: FontSizes.size13,
          verticalAlign: 'middle',
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
              borderColor: extendedSemanticColors.primaryButtonBackground,
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
              borderColor: semanticColors.primaryButtonBackground,
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
                  color: extendedSemanticColors.bodyTextHover,
                },
                ':before': {
                  borderColor: extendedSemanticColors.controlOutlineHovered,
                },
              },
            },
            !disabled &&
              checked && {
                selectors: {
                  ':before': {
                    // hover circle border
                    borderColor: extendedSemanticColors.primaryButtonBackgroundPressed,
                  },
                },
              },
          ],
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
      disabled && {
        selectors: {
          '.ms-ChoiceFieldLabel': {
            color: semanticColors.disabledBodyText,
          },
        },
      },
      checked &&
        disabled && {
          borderColor: semanticColors.disabledBodyText,
        },
    ],
  };
};
