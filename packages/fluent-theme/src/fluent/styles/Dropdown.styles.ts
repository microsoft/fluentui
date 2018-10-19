import { IDropdownStyleProps } from 'office-ui-fabric-react/lib/Dropdown';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { RectangleEdge } from 'office-ui-fabric-react/lib/utilities/positioning';
import { fluentBorderRadius } from './styleConstants';
import { CommunicationColors, SharedColors, NeutralColors } from '../FluentColors';
import { Depths } from '../FluentDepths';

export const DropdownStyles = (props: IDropdownStyleProps) => {
  const { disabled, hasError, isOpen, calloutRenderEdge, theme, isRenderingPlaceholder } = props;

  if (!theme) {
    throw new Error('theme is undefined or null in base Dropdown getStyles function.');
  }

  const { semanticColors, palette } = theme;
  const ITEM_HEIGHT = '36px';

  const titleOpenBorderRadius =
    calloutRenderEdge === RectangleEdge.bottom
      ? `${fluentBorderRadius} ${fluentBorderRadius} 0 0`
      : `0 0 ${fluentBorderRadius} ${fluentBorderRadius}`;

  const calloutOpenBorderRadius =
    calloutRenderEdge === RectangleEdge.bottom
      ? `0 0 ${fluentBorderRadius} ${fluentBorderRadius}`
      : `${fluentBorderRadius} ${fluentBorderRadius} 0 0`;

  const commonItemStyles = {
    minHeight: ITEM_HEIGHT,
    lineHeight: '19px',
    padding: '0 8px'
  };

  const itemSelectors = (isSelected: boolean = false) => {
    return {
      // TODO
      // After moving fluent to become the default design of Fabric we should revisit this selectors to match the fluent redlines.
      // Currently whenever you hover over an item it forces focus on it so we style the background change through focus selector.
      selectors: {
        '&:hover:focus': {
          color: semanticColors.menuItemTextHovered,
          backgroundColor: !isSelected ? semanticColors.menuItemBackgroundHovered : semanticColors.menuItemBackgroundPressed
        },
        '&:focus': {
          backgroundColor: !isSelected ? 'transparent' : semanticColors.menuItemBackgroundPressed
        },
        '&:active': {
          color: semanticColors.menuItemTextHovered,
          backgroundColor: !isSelected ? semanticColors.menuItemBackgroundHovered : semanticColors.menuItemBackgroundPressed
        }
      }
    };
  };

  return {
    dropdown: [
      disabled && {
        selectors: {
          // Title placeholder states when disabled.
          ['&:hover .ms-Dropdown-titleIsPlaceHolder']: { color: semanticColors.disabledText },
          ['&:focus .ms-Dropdown-titleIsPlaceHolder']: { color: semanticColors.disabledText },
          ['&:active .ms-Dropdown-titleIsPlaceHolder']: { color: semanticColors.disabledText }
        }
      },
      !disabled && {
        selectors: {
          // Title and border states. For :hover and :focus even if the styles are the same we need to keep them separate for specificity
          // reasons in order :active borderColor to work.
          ['&:hover .ms-Dropdown-title']: { color: semanticColors.menuItemTextHovered, borderColor: palette.neutralPrimary },
          ['&:focus .ms-Dropdown-title']: { color: semanticColors.menuItemTextHovered, borderColor: palette.neutralPrimary },
          ['&:active .ms-Dropdown-title']: {
            color: semanticColors.menuItemTextHovered,
            fontWeight: FontWeights.semibold,
            borderColor: CommunicationColors.primary
          },

          // CaretDown states are the same for focus, hover, active.
          ['&:hover .ms-Dropdown-caretDown, &:focus .ms-Dropdown-caretDown, &:active .ms-Dropdown-caretDown']: {
            color: palette.neutralPrimary
          },

          // Title placeholder states when not disabled.
          ['&:hover .ms-Dropdown-titleIsPlaceHolder, &:focus .ms-Dropdown-titleIsPlaceHolder, &:active .ms-Dropdown-titleIsPlaceHolder']: {
            color: semanticColors.menuItemTextHovered
          },

          // Title has error states
          ['&:hover .ms-Dropdown-title--hasError, &:focus .ms-Dropdown-title--hasError, &:active .ms-Dropdown-title--hasError']: {
            borderColor: SharedColors.red20,
            color: isRenderingPlaceholder ? semanticColors.inputPlaceholderText : palette.neutralPrimary
          }
        }
      }
    ],
    title: [
      {
        borderColor: !hasError ? NeutralColors.gray80 : SharedColors.red10,
        borderRadius: isOpen ? titleOpenBorderRadius : fluentBorderRadius,
        padding: `0 28px 0 8px`
      },
      disabled && { color: semanticColors.disabledText }
    ],
    caretDownWrapper: {
      right: 8
    },
    caretDown: [
      disabled && {
        color: semanticColors.disabledText
      }
    ],
    errorMessage: { color: SharedColors.red20 },
    callout: {
      border: 'none',
      borderRadius: calloutOpenBorderRadius,
      boxShadow: Depths.depth8,
      selectors: {
        ['.ms-Callout-main']: { borderRadius: calloutOpenBorderRadius }
      }
    },
    dropdownItemHeader: {
      padding: '0 8px',
      height: ITEM_HEIGHT,
      lineHeight: ITEM_HEIGHT
    },
    dropdownItem: [commonItemStyles, itemSelectors()],
    dropdownItemSelected: [
      {
        backgroundColor: semanticColors.menuItemBackgroundPressed,
        color: palette.neutralDark
      },
      commonItemStyles,
      itemSelectors(true)
    ],
    dropdownItemDisabled: {
      ...commonItemStyles,
      color: semanticColors.disabledText
    },
    dropdownItemSelectedAndDisabled: {
      ...commonItemStyles,
      color: semanticColors.disabledText
    }
  };
};
