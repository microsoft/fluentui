import {
  IContextualMenuStyleProps,
  IContextualMenuStyles,
  IContextualMenuItemStyleProps,
  IContextualMenuItemStyles,
} from '@fluentui/react/lib/ContextualMenu';
import { Depths } from '../AzureDepths';
import * as StyleConstants from '../Constants';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const ContextualMenuStyles = (props: IContextualMenuStyleProps): Partial<IContextualMenuStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    subComponentStyles: {
      callout: {
        root: {
          backgroundColor: extendedSemanticColors.controlBackground,
          borderColor: semanticColors.variantBorder,
          borderStyle: StyleConstants.borderSolid,
          borderWidth: StyleConstants.borderWidth,
          boxShadow: Depths.depth8,
          selectors: {
            '.ms-Callout-beak': {
              backgroundColor: semanticColors.inputBackground,
            },
          },
        },
      },
      menuItem: (itemStyleProps: IContextualMenuItemStyleProps): Partial<IContextualMenuItemStyles> => {
        return {
          root: [
            {
              fontSize: theme.fonts.medium.fontSize,
              backgroundColor: extendedSemanticColors.controlBackground,
              selectors: {
                '&:hover': {
                  backgroundColor: semanticColors.listItemBackgroundHovered,
                  color: semanticColors.bodyText,
                  selectors: {
                    '.ms-ContextualMenu-icon': {
                      color: extendedSemanticColors.iconButtonFillHovered,
                    },
                  },
                },
                '&:active': {
                  color: semanticColors.buttonTextHovered,
                },
                '.ms-ContextualMenu-icon': {
                  color: extendedSemanticColors.iconButtonFill,
                },
              },
            },
          ],
          splitPrimary: {
            fontSize: theme.fonts.medium.fontSize,
          },
          divider: {
            backgroundColor: semanticColors.variantBorder,
          },
          iconColor: {
            color: semanticColors.focusBorder,
          },
          item: {
            selectors: {
              '.is-expanded': {
                backgroundColor: semanticColors.menuItemBackgroundHovered,
                color: semanticColors.inputText,
              },
            },
          },
        };
      },
    },
  };
};
