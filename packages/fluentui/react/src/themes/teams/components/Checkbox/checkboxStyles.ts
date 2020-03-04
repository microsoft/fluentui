import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import Checkbox, { CheckboxProps } from '../../../../components/Checkbox/Checkbox';
import { CheckboxVariables } from './checkboxVariables';
import getBorderFocusStyles from '../../getBorderFocusStyles';
import checkboxIndicatorUrl from './checkboxIndicatorUrl';
import toggleIndicatorUrl from './toggleIndicatorUrl';

export type CheckboxStylesProps = Pick<CheckboxProps, 'checked' | 'disabled' | 'labelPosition' | 'toggle'>;

const checkboxStyles: ComponentSlotStylesPrepared<CheckboxStylesProps, CheckboxVariables> = {
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
        ...(!p.toggle && {
          ...(p.checked && {
            borderColor: v.checkedBackgroundHover,
            backgroundImage: checkboxIndicatorUrl(v.checkedIndicatorColor, v.checkedBackgroundHover)
          }),
          ...(!p.checked && {
            borderColor: v.borderColorHover
          })
        }),
        ...(p.toggle &&
          !p.disabled && {
            borderColor: v.borderColorHover,

            ':before': {
              content: "' '",
              width: v.toggleIndicatorSize,
              height: v.toggleIndicatorSize,
              margin: v.togglePadding,
              transition: 'margin .3s ease',
              backgroundImage: toggleIndicatorUrl(p.checked, v.borderColorHover),
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            },

            ...(p.checked && {
              borderColor: v.checkedBorderColor,
              backgroundColor: v.checkedBackgroundHover,
              ':before': {
                width: v.toggleIndicatorSize,
                height: v.toggleIndicatorSize,
                margin: v.toggleCheckedPadding,
                transition: 'margin .3s ease',
                content: "' '",
                backgroundImage: toggleIndicatorUrl(p.checked, v.checkedIndicatorColor),
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }
            })
          })
      }
    },

    ...(p.checked && {
      color: v.checkedTextColor
    }),

    ...(p.disabled && {
      cursor: 'default',
      pointerEvents: 'none',
      color: v.disabledColor
    })
  }),

  checkbox: ({ props: p, variables: v }): ICSSInJSStyle => ({
    gridColumn: p.labelPosition === 'start' ? 3 : 1,
    '-ms-grid-row-align': 'center',
    boxShadow: 'unset',

    borderColor: v.borderColor,
    borderStyle: v.borderStyle,
    borderRadius: v.borderRadius,
    borderWidth: v.borderWidth,
    color: v.indicatorColor,
    margin: v.margin,
    padding: v.padding,
    userSelect: 'none',

    backgroundImage: checkboxIndicatorUrl(v.indicatorColor, v.background),
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

    ...(p.checked && {
      borderColor: v.checkedBorderColor,
      backgroundImage: checkboxIndicatorUrl(v.checkedIndicatorColor, v.checkedBackground)
    }),

    ...(p.disabled && {
      background: v.disabledBackground,
      borderColor: v.disabledBorderColor
    }),

    ...(p.disabled &&
      p.checked && {
        color: v.disabledCheckedIndicatorColor,
        borderColor: v.disabledBackgroundChecked,
        backgroundImage: checkboxIndicatorUrl(v.disabledCheckedIndicatorColor, v.disabledBackgroundChecked)
      })
  }),

  toggle: ({ props: p, variables: v }): ICSSInJSStyle => ({
    '-ms-grid-row-align': 'center',
    gridColumn: p.labelPosition === 'start' ? 3 : 1,
    boxShadow: 'unset',
    boxSizing: 'border-box',

    background: v.background,
    borderColor: v.borderColor,
    borderStyle: v.borderStyle,
    borderRadius: v.toggleBorderRadius,
    borderWidth: v.borderWidth,
    margin: v.toggleMargin,
    userSelect: 'none',
    width: v.toggleWidth,
    height: v.toggleHeight,

    ':before': {
      content: "' '",
      width: v.toggleIndicatorSize,
      height: v.toggleIndicatorSize,
      margin: v.togglePadding,
      transition: 'margin .3s ease',
      backgroundImage: toggleIndicatorUrl(p.checked, p.disabled ? v.disabledToggleIndicatorColor : v.borderColor),
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    },

    ...(p.checked && {
      borderColor: v.checkedBorderColor,
      backgroundColor: v.checkedBackground,
      ':before': {
        width: v.toggleIndicatorSize,
        height: v.toggleIndicatorSize,
        margin: v.toggleCheckedPadding,
        transition: 'margin .3s ease',
        content: "' '",
        backgroundImage: toggleIndicatorUrl(p.checked, p.disabled ? v.disabledCheckedIndicatorColor : v.checkedIndicatorColor),
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    }),

    ...(p.disabled && {
      background: v.disabledBackground,
      borderColor: v.disabledBorderColor
    }),

    ...(p.disabled &&
      p.checked && {
        background: v.disabledBackgroundChecked,
        borderColor: 'transparent'
      })
  }),

  label: ({ props: p }): ICSSInJSStyle => ({
    display: 'block', // IE11: should be forced to be block, as inline-block is not supported
    gridColumn: p.labelPosition === 'start' ? 1 : 3
  })
};

export default checkboxStyles;
