import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { dropdownSlotClassNames, DropdownStylesProps } from '../../../../components/Dropdown/Dropdown';
import { DropdownVariables } from './dropdownVariables';
import { pxToRem } from '../../../../utils';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { clearIndicatorUrl } from './clearIndicatorUrl';
import { toggleIndicatorUrl } from './toggleIndicatorUrl';

const transparentColorStyle: ICSSInJSStyle = {
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  borderBottomColor: 'transparent',
};

const transparentColorStyleObj: ICSSInJSStyle = {
  ...transparentColorStyle,
  ':hover': transparentColorStyle,
  ':active': transparentColorStyle,
  ':focus': {
    ...transparentColorStyle,
    ':active': transparentColorStyle,
  },
};

const getWidth = (p: DropdownStylesProps, v: DropdownVariables): string => {
  if (p.fluid) {
    return '100%';
  }

  if (p.inline) {
    return 'initial';
  }

  return v.width;
};

export const dropdownStyles: ComponentSlotStylesPrepared<DropdownStylesProps, DropdownVariables> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    ...(p.inline && { display: 'inline-flex' }),
  }),

  clearIndicator: ({ variables: v, props: p }) => ({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    ...(p.isEmptyClearIndicator && { backgroundImage: clearIndicatorUrl(v.color) }),
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
    userSelect: 'none',
    margin: 0,
    position: 'absolute',
    right: pxToRem(6),
    height: '100%',
    width: pxToRem(16),
  }),

  container: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    borderStyle: 'solid',
    borderColor: v.borderColor,
    outline: 0,
    width: getWidth(p, v),
    borderWidth: p.search ? `0 0 ${v.searchBorderBottomWidth} 0` : v.borderWidth,
    color: v.color,
    backgroundColor: v.backgroundColor,
    borderRadius: v.containerBorderRadius,
    ...(p.open && p.position === 'above' && { borderRadius: v.openAboveContainerBorderRadius }),
    ...(p.open && p.position === 'below' && { borderRadius: v.openBelowContainerBorderRadius }),

    ':hover': {
      backgroundColor: v.backgroundColorHover,
      borderColor: v.borderColorHover,

      ...(p.open && {
        borderColor: v.openBorderColorHover,
      }),
    },
    ...(p.error && {
      border: `${pxToRem(1)} solid ${v.borderError}`,
      ':hover': { border: `${pxToRem(1)} solid ${v.borderError}` },
    }),
    ':active': {
      backgroundColor: v.backgroundColor,
    },
    ':focus-within': {
      // when dropdown's selected items are focused
      // keep the focus border style
      borderBottomColor: v.borderColorFocus,
    },
    ...(p.focused && {
      backgroundColor: v.backgroundColor,
      ...(p.search && {
        borderBottomColor: v.borderColorFocus,
      }),
      ...(!p.search &&
        !p.open &&
        p.isFromKeyboard &&
        getBorderFocusStyles({ variables: siteVariables })[':focus-visible']),
    }),
    ...(p.inline && {
      ...transparentColorStyleObj,
      alignItems: 'center',
    }),
    ...(p.inverted && {
      backgroundColor: v.invertedBackgroundColor,
      ':hover': {
        backgroundColor: v.invertedBackgroundColorHover,
      },
      ':active': {
        backgroundColor: v.invertedBackgroundColorHover,
      },
      ':focus': {
        backgroundColor: v.invertedBackgroundColorHover,
      },
    }),

    ...(p.disabled && {
      backgroundColor: siteVariables.colorScheme.default.backgroundDisabled,
      borderColor: siteVariables.colorScheme.default.borderDisabled,
      userSelect: 'none',

      ':hover': {
        backgroundColor: siteVariables.colorScheme.default.backgroundDisabled,
      },

      ':active': {
        backgroundColor: siteVariables.colorScheme.default.backgroundDisabled,
      },
    }),

    [`& .${dropdownSlotClassNames.triggerButton}`]: {
      ...(p.disabled && {
        color: siteVariables.colorScheme.default.foregroundDisabled,
      }),
    },
  }),

  selectedItems: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'auto',
    maxHeight: v.selectedItemsMaxHeight,
    width: '100%',
    ...(p.hasToggleIndicator && { paddingRight: v.toggleIndicatorSize }),
  }),

  triggerButton: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      overflow: 'hidden',
      boxShadow: 'none',
      ...transparentColorStyleObj,
      margin: '0',
      justifyContent: 'left',
      padding: v.comboboxPaddingButton,
      ...(p.multiple && { minWidth: 0, flex: 1 }),
      ...transparentColorStyleObj,
      ':focus': {
        color: v.color,
        ...transparentColorStyleObj,
      },
      ':focus-visible': {
        color: v.color,
        ...transparentColorStyle,
        ':after': {
          borderColor: 'transparent',
          borderRightWidth: 0,
        },
        ':before': {
          borderColor: 'transparent',
          borderRightWidth: 0,
        },
      },
      ':active': {
        color: v.color, // required for HC theme
        ...transparentColorStyle,
        animationName: 'unset',
        animationDuration: 'unset',
      },
      ':hover': {
        ...transparentColorStyle,
        color: v.color, // required for HC theme
      },
      ...(p.inline && {
        paddingLeft: 0,
        paddingRight: 0,
        width: 'initial',
      }),
    };
  },

  list: ({ props: p, variables: v }): ICSSInJSStyle => ({
    outline: 0,
    borderStyle: 'solid',
    borderWidth: p.open ? v.listBorderWidth : '0px',
    borderColor: v.listBorderColor,
    zIndex: v.overlayZIndex,
    maxHeight: v.listMaxHeight,
    overflowY: 'auto',
    width: getWidth(p, v),
    background: v.listBackgroundColor,
    ...(p.position === 'above' && { borderRadius: v.aboveListBorderRadius }),
    ...(p.position === 'below' && { borderRadius: v.belowListBorderRadius }),
    ...(p.open && {
      boxShadow: v.listBoxShadow,
      padding: v.listPadding,
    }),
  }),

  loadingMessage: ({ variables: v }): ICSSInJSStyle => ({
    backgroundColor: v.loadingMessageBackgroundColor,
  }),

  noResultsMessage: ({ variables: v }): ICSSInJSStyle => ({
    backgroundColor: v.noResultsMessageBackgroundColor,
    fontWeight: 'bold',
  }),

  headerMessage: ({ variables: v }): ICSSInJSStyle => ({
    backgroundColor: v.headerMessageBackgroundColor,
  }),

  toggleIndicator: ({ props: p, variables: v }) => ({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',

    backgroundImage: toggleIndicatorUrl(p.disabled ? v.disabledColor : v.color),
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
    ...(p.disabled && {
      cursor: 'default',
    }),
    userSelect: 'none',

    margin: 0,
    position: 'absolute',
    right: pxToRem(8),
    height: '100%',
    width: pxToRem(12),
  }),
};
