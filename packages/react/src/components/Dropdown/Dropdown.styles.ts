import { IsFocusVisibleClassName } from '../../Utilities';
import { RectangleEdge } from '../../Positioning';
import {
  FontWeights,
  HighContrastSelector,
  getGlobalClassNames,
  normalize,
  HighContrastSelectorWhite,
  getScreenSelector,
  ScreenWidthMinMedium,
  getHighContrastNoAdjustStyle,
} from '../../Styling';
import type { IDropdownStyles, IDropdownStyleProps } from './Dropdown.types';
import type { IStyleFunction } from '../../Utilities';
import type { IRawStyle, IStyle } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-Dropdown-container',
  label: 'ms-Dropdown-label',
  dropdown: 'ms-Dropdown',
  title: 'ms-Dropdown-title',
  caretDownWrapper: 'ms-Dropdown-caretDownWrapper',
  caretDown: 'ms-Dropdown-caretDown',
  callout: 'ms-Dropdown-callout',
  panel: 'ms-Dropdown-panel',
  dropdownItems: 'ms-Dropdown-items',
  dropdownItem: 'ms-Dropdown-item',
  dropdownDivider: 'ms-Dropdown-divider',
  dropdownOptionText: 'ms-Dropdown-optionText',
  dropdownItemHeader: 'ms-Dropdown-header',
  titleIsPlaceHolder: 'ms-Dropdown-titleIsPlaceHolder',
  titleHasError: 'ms-Dropdown-title--hasError',
};

const DROPDOWN_HEIGHT = 32;
const DROPDOWN_ITEM_HEIGHT = 36;

const highContrastAdjustMixin = {
  [`${HighContrastSelector}, ${HighContrastSelectorWhite.replace('@media ', '')}`]: {
    ...getHighContrastNoAdjustStyle(),
  },
};

const highContrastItemAndTitleStateMixin: IRawStyle = {
  selectors: {
    [HighContrastSelector]: {
      backgroundColor: 'Highlight',
      borderColor: 'Highlight',
      color: 'HighlightText',

      [`.${IsFocusVisibleClassName} &:focus:after`]: {
        borderColor: 'HighlightText',
      },
    },
    ['.ms-Checkbox-checkbox']: {
      [HighContrastSelector]: {
        borderColor: 'HighlightText',
      },
    },
    ...highContrastAdjustMixin,
  },
};

const highContrastBorderState: IRawStyle = {
  selectors: {
    [HighContrastSelector]: {
      borderColor: 'Highlight',
    },
  },
};

const MinimumScreenSelector = getScreenSelector(0, ScreenWidthMinMedium);

export const getStyles: IStyleFunction<IDropdownStyleProps, IDropdownStyles> = props => {
  const {
    theme,
    hasError,
    hasLabel,
    className,
    isOpen,
    disabled,
    required,
    isRenderingPlaceholder,
    panelClassName,
    calloutClassName,
    calloutRenderEdge,
  } = props;

  if (!theme) {
    throw new Error('theme is undefined or null in base Dropdown getStyles function.');
  }

  const globalClassnames = getGlobalClassNames(GlobalClassNames, theme);
  const { palette, semanticColors, effects, fonts } = theme;

  const rootHoverFocusActiveSelectorNeutralDarkMixin: IStyle = {
    color: semanticColors.menuItemTextHovered,
  };

  const rootHoverFocusActiveSelectorNeutralPrimaryMixin: IStyle = {
    color: semanticColors.menuItemText,
  };

  const borderColorError: IStyle = {
    borderColor: semanticColors.errorText,
  };

  const dropdownItemStyle: IStyle = [
    globalClassnames.dropdownItem,
    {
      backgroundColor: 'transparent',
      boxSizing: 'border-box',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      width: '100%',
      minHeight: DROPDOWN_ITEM_HEIGHT,
      lineHeight: 20,
      height: 0,
      position: 'relative',
      border: '1px solid transparent',
      borderRadius: 0,
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      textAlign: 'left',

      '.ms-Button-flexContainer': {
        width: '100%',
      },
    },
  ];

  const dropdownHeaderStyle: IStyle = [
    globalClassnames.dropdownItemHeader,
    {
      ...fonts.medium,
      fontWeight: FontWeights.semibold,
      color: semanticColors.menuHeader,
      background: 'none',
      backgroundColor: 'transparent',
      border: 'none',
      height: DROPDOWN_ITEM_HEIGHT,
      lineHeight: DROPDOWN_ITEM_HEIGHT,
      cursor: 'default',
      padding: '0 8px',
      userSelect: 'none',
      textAlign: 'left',
      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText',
          ...getHighContrastNoAdjustStyle(),
        },
      },
    },
  ];

  const selectedItemBackgroundColor = semanticColors.menuItemBackgroundPressed;

  const itemSelectors = (isSelected: boolean = false) => {
    return {
      selectors: {
        '&:hover': [
          {
            color: semanticColors.menuItemTextHovered,
            backgroundColor: !isSelected ? semanticColors.menuItemBackgroundHovered : selectedItemBackgroundColor,
          },
          highContrastItemAndTitleStateMixin,
        ],
        '&.is-multi-select:hover': [
          { backgroundColor: !isSelected ? 'transparent' : selectedItemBackgroundColor },
          highContrastItemAndTitleStateMixin,
        ],
        '&:active:hover': [
          {
            color: semanticColors.menuItemTextHovered,
            backgroundColor: !isSelected
              ? semanticColors.menuItemBackgroundPressed
              : semanticColors.menuItemBackgroundHovered,
          },
          highContrastItemAndTitleStateMixin,
        ],
        [`.${IsFocusVisibleClassName} &:focus:after, :host(.${IsFocusVisibleClassName}) &:focus:after`]: {
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          [HighContrastSelector]: {
            inset: '2px',
          },
        },
        [HighContrastSelector]: {
          border: 'none',
        },
      },
    };
  };

  const dropdownItemSelected: IStyle = [
    ...dropdownItemStyle,
    {
      backgroundColor: selectedItemBackgroundColor,
      color: semanticColors.menuItemTextHovered,
    },
    itemSelectors(true),
    highContrastItemAndTitleStateMixin,
  ];

  const dropdownItemDisabled: IStyle = [
    ...dropdownItemStyle,
    {
      color: semanticColors.disabledText,
      cursor: 'default',
      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText',
          border: 'none',
        },
      },
    },
  ];

  const titleOpenBorderRadius =
    calloutRenderEdge === RectangleEdge.bottom
      ? `${effects.roundedCorner2} ${effects.roundedCorner2} 0 0`
      : `0 0 ${effects.roundedCorner2} ${effects.roundedCorner2}`;

  const calloutOpenBorderRadius =
    calloutRenderEdge === RectangleEdge.bottom
      ? `0 0 ${effects.roundedCorner2} ${effects.roundedCorner2}`
      : `${effects.roundedCorner2} ${effects.roundedCorner2} 0 0`;

  return {
    root: [globalClassnames.root, className],
    label: globalClassnames.label,
    dropdown: [
      globalClassnames.dropdown,
      normalize,
      fonts.medium,
      {
        color: semanticColors.menuItemText,
        borderColor: semanticColors.focusBorder,
        position: 'relative',
        outline: 0,
        userSelect: 'none',
        selectors: {
          ['&:hover .' + globalClassnames.title]: [
            !disabled && rootHoverFocusActiveSelectorNeutralDarkMixin,
            { borderColor: isOpen ? palette.neutralSecondary : palette.neutralPrimary },
            highContrastBorderState,
          ],
          ['&:focus .' + globalClassnames.title]: [
            !disabled && rootHoverFocusActiveSelectorNeutralDarkMixin,
            { selectors: { [HighContrastSelector]: { color: 'Highlight' } } },
          ],

          ['&:focus:after']: [
            {
              pointerEvents: 'none',
              content: "''",
              position: 'absolute',
              boxSizing: 'border-box',
              top: '0px',
              left: '0px',
              width: '100%',
              height: '100%',
              // see https://github.com/microsoft/fluentui/pull/9182 for semantic color disc
              border: !disabled ? `2px solid ${palette.themePrimary}` : 'none',
              borderRadius: '2px',

              selectors: {
                [HighContrastSelector]: {
                  color: 'Highlight',
                },
              },
            },
          ],
          ['&:active .' + globalClassnames.title]: [
            !disabled && rootHoverFocusActiveSelectorNeutralDarkMixin,
            { borderColor: palette.themePrimary },
            highContrastBorderState,
          ],

          ['&:hover .' + globalClassnames.caretDown]: !disabled && rootHoverFocusActiveSelectorNeutralPrimaryMixin,
          ['&:focus .' + globalClassnames.caretDown]: [
            !disabled && rootHoverFocusActiveSelectorNeutralPrimaryMixin,
            { selectors: { [HighContrastSelector]: { color: 'Highlight' } } },
          ],
          ['&:active .' + globalClassnames.caretDown]: !disabled && rootHoverFocusActiveSelectorNeutralPrimaryMixin,

          ['&:hover .' + globalClassnames.titleIsPlaceHolder]:
            !disabled && rootHoverFocusActiveSelectorNeutralPrimaryMixin,
          ['&:focus .' + globalClassnames.titleIsPlaceHolder]:
            !disabled && rootHoverFocusActiveSelectorNeutralPrimaryMixin,
          ['&:active .' + globalClassnames.titleIsPlaceHolder]:
            !disabled && rootHoverFocusActiveSelectorNeutralPrimaryMixin,

          ['&:hover .' + globalClassnames.titleHasError]: borderColorError,
          ['&:active .' + globalClassnames.titleHasError]: borderColorError,
        },
      },
      isOpen && 'is-open',
      disabled && 'is-disabled',
      required && 'is-required',
      required &&
        !hasLabel && {
          selectors: {
            ':before': {
              content: `'*'`,
              color: semanticColors.errorText,
              position: 'absolute',
              top: -5,
              right: -10,
            },
            [HighContrastSelector]: {
              selectors: {
                ':after': {
                  right: -14, // moving the * 4 pixel to right to alleviate border clipping in HC mode.
                },
              },
            },
          },
        },
    ],
    title: [
      globalClassnames.title,
      normalize,
      {
        backgroundColor: semanticColors.inputBackground,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: semanticColors.inputBorder,
        borderRadius: isOpen ? titleOpenBorderRadius : effects.roundedCorner2,
        cursor: 'pointer',
        display: 'block',
        height: DROPDOWN_HEIGHT,
        lineHeight: DROPDOWN_HEIGHT - 2,
        padding: `0 28px 0 8px`,
        position: 'relative',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      isRenderingPlaceholder && [globalClassnames.titleIsPlaceHolder, { color: semanticColors.inputPlaceholderText }],
      hasError && [globalClassnames.titleHasError, borderColorError],
      disabled && {
        backgroundColor: semanticColors.disabledBackground,
        border: 'none',
        color: semanticColors.disabledText,
        cursor: 'default',
        selectors: {
          [HighContrastSelector]: {
            border: '1px solid GrayText',
            color: 'GrayText',
            backgroundColor: 'Window',
            ...getHighContrastNoAdjustStyle(),
          },
        },
      },
    ],
    caretDownWrapper: [
      globalClassnames.caretDownWrapper,
      {
        height: DROPDOWN_HEIGHT,
        lineHeight: DROPDOWN_HEIGHT - 2, // height minus the border
        paddingTop: 1,
        position: 'absolute',
        right: 8,
        top: 0,
      },
      !disabled && {
        cursor: 'pointer',
      },
    ],
    caretDown: [
      globalClassnames.caretDown,
      { color: palette.neutralSecondary, fontSize: fonts.small.fontSize, pointerEvents: 'none' },
      disabled && {
        color: semanticColors.disabledText,
        selectors: {
          [HighContrastSelector]: { color: 'GrayText', ...getHighContrastNoAdjustStyle() },
        },
      },
    ],
    errorMessage: { color: semanticColors.errorText, ...theme.fonts.small, paddingTop: 5 },
    callout: [
      globalClassnames.callout,
      {
        boxShadow: effects.elevation8,
        borderRadius: calloutOpenBorderRadius,
        selectors: {
          ['.ms-Callout-main']: { borderRadius: calloutOpenBorderRadius },
        },
      },
      calloutClassName,
    ],
    dropdownItemsWrapper: { selectors: { '&:focus': { outline: 0 } } },
    dropdownItems: [globalClassnames.dropdownItems, { display: 'block' }],
    dropdownItem: [...dropdownItemStyle, itemSelectors()],
    dropdownItemSelected,
    dropdownItemDisabled,
    dropdownItemSelectedAndDisabled: [dropdownItemSelected, dropdownItemDisabled, { backgroundColor: 'transparent' }],
    dropdownItemHidden: [...dropdownItemStyle, { display: 'none' }],
    dropdownDivider: [globalClassnames.dropdownDivider, { height: 1, backgroundColor: semanticColors.bodyDivider }],
    dropdownDividerHidden: [globalClassnames.dropdownDivider, { display: 'none' }],
    dropdownOptionText: [
      globalClassnames.dropdownOptionText,
      {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        minWidth: 0,
        maxWidth: '100%',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        margin: '1px',
      },
    ],
    dropdownItemHeader: dropdownHeaderStyle,
    dropdownItemHeaderHidden: [...dropdownHeaderStyle, { display: 'none' }],
    subComponentStyles: {
      label: { root: { display: 'inline-block' } },
      multiSelectItem: {
        root: {
          padding: 0,
        },
        label: {
          alignSelf: 'stretch',
          padding: '0 8px',
          width: '100%',
        },
        input: {
          selectors: {
            // eslint-disable-next-line @fluentui/max-len
            [`.${IsFocusVisibleClassName} &:focus + label::before, :host(.${IsFocusVisibleClassName}) &:focus + label::before`]:
              {
                outlineOffset: '0px',
              },
          },
        },
      },
      panel: {
        root: [panelClassName],
        main: {
          selectors: {
            // In case of extra small screen sizes
            [MinimumScreenSelector]: {
              // panelWidth xs
              width: 272,
            },
          },
        },
        contentInner: { padding: '0 0 20px' },
      },
    },
  };
};
