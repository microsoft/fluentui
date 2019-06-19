import {
  IContextualMenuStyleProps,
  IContextualMenuStyles,
  IContextualMenuItemStyleProps,
  IContextualMenuItemStyles
} from 'office-ui-fabric-react/lib/ContextualMenu';
import { IsFocusVisibleClassName } from 'office-ui-fabric-react/lib/Utilities';
import { MinimumScreenSelector } from './styleConstants';
import { FontSizes } from '../FluentType';

export const ContextualMenuStyles = (props: IContextualMenuStyleProps): Partial<IContextualMenuStyles> => {
  const { theme } = props;
  const { palette, effects } = theme;
  const CONTEXTUAL_MENU_ITEM_HEIGHT = 36;

  const iconStyles = {
    maxHeight: CONTEXTUAL_MENU_ITEM_HEIGHT,
    fontSize: FontSizes.size16,
    width: FontSizes.size16,
    selectors: {
      [MinimumScreenSelector]: {
        fontSize: FontSizes.size20,
        width: FontSizes.size20
      }
    }
  };

  return {
    subComponentStyles: {
      callout: {
        root: {
          border: 'none',
          borderRadius: effects.roundedCorner2,
          boxShadow: effects.elevation8,
          selectors: {
            ['.ms-Callout-main']: { borderRadius: effects.roundedCorner2 }
          }
        },
        beakCurtain: { borderRadius: effects.roundedCorner2 }
      },
      menuItem: (itemStyleProps: IContextualMenuItemStyleProps): Partial<IContextualMenuItemStyles> => {
        const { disabled, expanded, primaryDisabled, checked } = itemStyleProps;

        return {
          root: [
            {
              height: CONTEXTUAL_MENU_ITEM_HEIGHT,
              lineHeight: CONTEXTUAL_MENU_ITEM_HEIGHT
            },
            !disabled &&
              !expanded && {
                selectors: {
                  ':hover': {
                    color: palette.neutralDark,
                    selectors: {
                      '.ms-ContextualMenu-icon': {
                        color: palette.themeDarkAlt
                      },
                      '.ms-ContextualMenu-submenuIcon': {
                        color: palette.neutralPrimary
                      }
                    }
                  },
                  ':active': {
                    selectors: {
                      '.ms-ContextualMenu-icon': {
                        color: palette.themeDark
                      },
                      '.ms-ContextualMenu-submenuIcon': {
                        color: palette.neutralPrimary
                      }
                    }
                  },
                  [`.${IsFocusVisibleClassName} &:focus, .${IsFocusVisibleClassName} &:focus:hover`]: { backgroundColor: palette.white }
                }
              },
            disabled && {
              color: palette.neutralTertiary
            }
          ],
          splitPrimary: [
            {
              height: CONTEXTUAL_MENU_ITEM_HEIGHT,
              lineHeight: CONTEXTUAL_MENU_ITEM_HEIGHT
            },
            !(disabled || primaryDisabled) &&
              !checked && {
                selectors: {
                  ':hover': {
                    color: palette.neutralDark,
                    selectors: {
                      '.ms-ContextualMenu-icon': {
                        color: palette.themeDarkAlt
                      }
                    }
                  },
                  ':active': {
                    selectors: {
                      '.ms-ContextualMenu-icon': {
                        color: palette.themeDark
                      }
                    }
                  }
                }
              },
            (disabled || primaryDisabled) && {
              color: palette.neutralTertiary,
              selectors: {
                '.ms-ContextualMenu-icon': {
                  color: palette.neutralTertiary
                }
              }
            },
            checked && {
              selectors: {
                '.ms-ContextualMenu-checkmarkIcon': {
                  color: palette.neutralPrimary
                }
              }
            }
          ],
          splitMenu: [
            {
              height: CONTEXTUAL_MENU_ITEM_HEIGHT,
              lineHeight: CONTEXTUAL_MENU_ITEM_HEIGHT,
              width: CONTEXTUAL_MENU_ITEM_HEIGHT // to match the numbers from the default styles
            }
          ],
          icon: [{ ...iconStyles }, disabled && { color: palette.neutralTertiary }],
          checkmarkIcon: [{ ...iconStyles }],
          splitContainer: {
            height: CONTEXTUAL_MENU_ITEM_HEIGHT,
            selectors: {
              [`.${IsFocusVisibleClassName} &:focus, .${IsFocusVisibleClassName} &:focus:hover`]: { backgroundColor: palette.white }
            }
          },
          subMenuIcon: [
            {
              height: CONTEXTUAL_MENU_ITEM_HEIGHT,
              lineHeight: CONTEXTUAL_MENU_ITEM_HEIGHT,
              color: palette.neutralSecondary,
              fontSize: FontSizes.size12,
              selectors: {
                ':hover': {
                  color: palette.neutralPrimary
                },
                ':active': {
                  color: palette.neutralPrimary
                },
                [MinimumScreenSelector]: { fontSize: FontSizes.size16 }
              }
            },
            expanded && { color: palette.neutralPrimary },
            disabled && { color: palette.neutralTertiary }
          ]
        };
      }
    }
  };
};
