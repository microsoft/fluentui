import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import Checkbox, { CheckboxProps, CheckboxState } from '../../../../components/Checkbox/Checkbox'
import { CheckboxVariables } from './checkboxVariables'
import getBorderFocusStyles from '../../getBorderFocusStyles'

const checkboxStyles: ComponentSlotStylesPrepared<
  CheckboxProps & CheckboxState,
  CheckboxVariables
> = {
  root: ({ props: p, variables: v, theme: t }): ICSSInJSStyle => ({
    position: 'relative',

    display: 'inline-grid',
    // IE11: Gap is done via virtual column as in autoprefixer
    gridTemplateColumns: p.labelPosition === 'start' ? `1fr ${v.gap} auto` : `auto ${v.gap} 1fr`,
    cursor: 'pointer',
    outline: 0,

    color: v.textColor,
    padding: v.rootPadding,
    verticalAlign: 'middle',
    alignItems: 'start',

    ...getBorderFocusStyles({ siteVariables: t.siteVariables, borderRadius: '3px' }),

    ':hover': {
      color: v.textColorHover,

      [`& .${Checkbox.slotClassNames.indicator}`]: {
        ...(p.checked && {
          background: v.checkedBackgroundHover,
        }),

        ...(!p.checked && {
          borderColor: v.borderColorHover,

          ...(p.toggle && {
            color: v.borderColorHover,
          }),
        }),
      },
    },

    ...(p.checked && {
      color: v.checkedTextColor,
    }),

    ...(p.disabled && {
      cursor: 'default',
      pointerEvents: 'none',
      color: v.disabledColor,
    }),
  }),

  checkbox: ({ props: p, variables: v }): ICSSInJSStyle => ({
    gridColumn: p.labelPosition === 'start' ? 3 : 1,
    '-ms-grid-row-align': 'center',
    boxShadow: 'unset',

    background: v.background,
    borderColor: v.borderColor,
    borderStyle: v.borderStyle,
    borderRadius: v.borderRadius,
    borderWidth: v.borderWidth,
    color: v.indicatorColor,
    margin: v.margin,
    padding: v.padding,
    userSelect: 'none',

    ...(p.checked && {
      background: v.checkedBackground,
      borderColor: v.checkedBorderColor,
      color: v.checkedIndicatorColor,
    }),

    ...(p.disabled && {
      background: v.disabledBackground,
      borderColor: v.disabledBorderColor,
    }),

    ...(p.disabled &&
      p.checked && {
        color: v.disabledCheckedIndicatorColor,
        background: v.disabledBackgroundChecked,
        borderColor: 'transparent',
      }),
  }),

  toggle: ({ props: p, variables: v }): ICSSInJSStyle => ({
    '-ms-grid-row-align': 'center',
    gridColumn: p.labelPosition === 'start' ? 3 : 1,
    boxShadow: 'unset',

    background: v.background,
    borderColor: v.borderColor,
    borderStyle: v.borderStyle,
    borderRadius: v.toggleBorderRadius,
    borderWidth: v.borderWidth,
    color: v.borderColor,
    margin: v.toggleMargin,
    padding: v.togglePadding,
    transition: 'padding .3s ease',
    userSelect: 'none',
    width: v.toggleWidth,
    height: v.toggleHeight,

    [`& svg`]: {
      width: v.toggleIndicatorSize,
      height: v.toggleIndicatorSize,
    },

    ...(p.checked && {
      background: v.checkedBackground,
      borderColor: v.checkedBorderColor,
      color: v.checkedIndicatorColor,
      padding: v.toggleCheckedPadding,
    }),

    ...(p.disabled && {
      color: v.disabledToggleIndicatorColor,
      background: v.disabledBackground,
      borderColor: v.disabledBorderColor,
    }),

    ...(p.disabled &&
      p.checked && {
        color: v.disabledCheckedIndicatorColor,
        background: v.disabledBackgroundChecked,
        borderColor: 'transparent',
      }),
  }),

  label: ({ props: p }): ICSSInJSStyle => ({
    display: 'block', // IE11: should be forced to be block, as inline-block is not supported
    gridColumn: p.labelPosition === 'start' ? 1 : 3,
  }),
}

export default checkboxStyles
