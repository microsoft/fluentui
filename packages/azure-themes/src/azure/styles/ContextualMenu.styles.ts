import {
  IContextualMenuStyleProps,
  IContextualMenuStyles,
  IContextualMenuItemStyleProps,
  IContextualMenuItemStyles,
} from 'office-ui-fabric-react/lib/ContextualMenu';
import { Depths } from '../AzureDepths';
import { FontSizes } from '../AzureType';
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
          backgroundColor: semanticColors.inputBackground,
          borderColor: semanticColors.inputBorder,
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
              fontSize: FontSizes.size13,
              selectors: {
                '&:hover': {
                  backgroundColor: semanticColors.buttonBackgroundHovered,
                  color: semanticColors.buttonTextHovered,
                  selectors: {
                    '.ms-ContextualMenu-icon': {
                      color: extendedSemanticColors.iconButtonFillHovered,
                    },
                  },
                },
                '.ms-ContextualMenu-icon': {
                  color: extendedSemanticColors.iconButtonFill,
                },
              },
            },
          ],
          splitPrimary: {
            fontSize: FontSizes.size13,
          },
          divider: {
            backgroundColor: semanticColors.inputBorder,
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
