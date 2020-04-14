import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { default as Dropdown, DropdownProps, DropdownState } from '../../../../components/Dropdown/Dropdown';
import { DropdownVariables } from './dropdownVariables';
import { pxToRem } from '../../../../utils';
import getBorderFocusStyles from '../../getBorderFocusStyles';
import clearIndicatorUrl from './clearIndicatorUrl';
import toggleIndicatorUrl from './toggleIndicatorUrl';

type DropdownPropsAndState = DropdownProps & DropdownState;

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

const getWidth = (p: DropdownPropsAndState, v: DropdownVariables): string => {
  if (p.fluid) {
    return '100%';
  }

  if (p.inline) {
    return 'initial';
  }

  return v.width;
};

const dropdownStyles: ComponentSlotStylesPrepared<DropdownPropsAndState, DropdownVariables> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    ...(p.inline && { display: 'inline-flex' }),
  }),

  clearIndicator: ({ variables: v }) => ({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',

    backgroundImage: clearIndicatorUrl(v.color),
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

      ...(p.disabled && {
        backgroundColor: v.disabledBackgroundColorHover,
        borderColor: v.disabledBorderColorHover,
      }),

      [`& .${Dropdown.slotClassNames.triggerButton}`]: {
        color: v.triggerButtonColorHover,

        ...(p.disabled && {
          color: v.disabledTriggerColorHover,
        }),
      },
    },
    ...(p.focused && {
      ...(p.search && { borderBottomColor: v.borderColorFocus }),
      ...(!p.search &&
        !p.open &&
        p.isFromKeyboard &&
        getBorderFocusStyles({ variables: siteVariables })[':focus-visible']),
    }),
    ...(p.inline && {
      ...transparentColorStyleObj,
      alignItems: 'center',
    }),
  }),

  selectedItems: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'auto',
    maxHeight: v.selectedItemsMaxHeight,
    width: '100%',
    ...(p.toggleIndicator && { paddingRight: v.toggleIndicatorSize }),
  }),

  triggerButton: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      overflow: 'hidden',
      boxShadow: 'none',
      margin: '0',
      justifyContent: 'left',
      padding: v.comboboxPaddingButton,
      ...(p.multiple && { minWidth: 0, flex: 1 }),
      ...transparentColorStyleObj,
      ':focus': {
        color: v.color,
        ':active': {
          color: v.triggerButtonColorFocusActive,
        },
      },
      ':focus-visible': {
        color: v.color,
        ...transparentColorStyle,
        ':after': {
          borderColor: 'transparent',
        },
        ':before': {
          borderColor: 'transparent',
        },
        ':active': transparentColorStyle,
      },
      ':hover': {
        ...transparentColorStyle,
        color: v.triggerButtonColorHover,
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

export default dropdownStyles;
