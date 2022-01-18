import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CheckboxStylesProps, checkboxSlotClassNames } from '../../../../components/Checkbox/Checkbox';
import { CheckboxVariables } from './checkboxVariables';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { checkboxIndicatorUrl } from './checkboxIndicatorUrl';
import { checkboxIndicatorIndeterminateUrl } from './checkboxIndeterminateIndicatorUrl';
import { pxToRem } from '../../../../utils';

const commonToggleBeforeStyles = v => ({
  content: "' '",
  display: 'block',
  borderRadius: '50%',
  width: v.toggleIndicatorSize,
  height: v.toggleIndicatorSize,
  transition: 'margin .3s ease',
});

export const checkboxStyles: ComponentSlotStylesPrepared<CheckboxStylesProps, CheckboxVariables> = {
  root: ({ props: p, variables: v, theme: t }): ICSSInJSStyle => ({
    position: 'relative',

    display: 'inline-grid',
    gridTemplateColumns: `auto ${v.gap} 1fr`,
    // IE11: Gap is done via virtual column as in autoprefixer
    msGridColumns: `auto ${v.gap} 1fr`,

    ...(p.labelPosition === 'start' && {
      gridTemplateColumns: `1fr ${v.gap} auto`,
      msGridColumns: `1fr ${v.gap} auto`,
    }),

    cursor: 'pointer',
    outline: 0,

    color: v.textColor,
    padding: v.rootPadding,
    verticalAlign: 'middle',
    alignItems: 'start',

    ...getBorderFocusStyles({ variables: t.siteVariables, borderRadius: '3px' }),

    ':hover': {
      color: v.textColorHover,

      [`& .${checkboxSlotClassNames.indicator}`]: {
        ...(!p.toggle && {
          ...(p.checked &&
            p.checked !== 'mixed' && {
              borderColor: v.checkedBackgroundHover,
              backgroundImage: checkboxIndicatorUrl(v.checkedIndicatorColor, v.checkedBackgroundHover),
            }),
          ...(!p.checked && {
            borderColor: v.borderColorHover,
          }),
        }),
        ...(p.toggle &&
          !p.disabled && {
            borderColor: v.borderColorHover,

            ':before': {
              ...commonToggleBeforeStyles(v),
              borderColor: v.borderColorHover,
              borderStyle: v.borderStyle,
              borderWidth: v.borderWidth,
              margin: v.togglePadding,
              background: 'transparent',
            },

            ...(p.checked && {
              borderColor: v.checkedBorderColor,
              background: v.checkedBackgroundHover,
              ':before': {
                ...commonToggleBeforeStyles(v),
                margin: v.toggleCheckedPadding,
                background: v.checkedIndicatorColor,
              },
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
    msGridRowAlign: 'center',
    gridColumn: 1,
    msGridColumn: 1,

    ...(p.labelPosition === 'start' && {
      gridColumn: 3,
      msGridColumn: 3,
    }),

    boxShadow: 'unset',
    width: pxToRem(16),
    height: pxToRem(16),

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
      backgroundColor: v.checkedBackground,
      backgroundImage: checkboxIndicatorUrl(v.checkedIndicatorColor, v.checkedBackground),
    }),

    ...(p.checked === 'mixed' && {
      backgroundImage: checkboxIndicatorIndeterminateUrl(v.checkedIndicatorColor, v.checkedBackground),
    }),

    ...(p.disabled && {
      backgroundColor: v.disabledBackground,
      borderColor: v.disabledBorderColor,
    }),

    ...(p.disabled &&
      p.checked && {
        color: v.disabledCheckedIndicatorColor,
        borderColor: v.disabledBackgroundChecked,
        backgroundColor: v.disabledBackgroundChecked,
        backgroundImage: checkboxIndicatorUrl(v.disabledCheckedIndicatorColor, v.disabledBackgroundChecked),
      }),

    ...(p.disabled &&
      p.checked === 'mixed' && {
        color: v.disabledCheckedIndicatorColor,
        borderColor: v.disabledBackgroundChecked,
        backgroundColor: v.disabledBackgroundChecked,
        backgroundImage: checkboxIndicatorIndeterminateUrl(
          v.disabledCheckedIndicatorColor,
          v.disabledBackgroundChecked,
        ),
      }),
  }),

  toggle: ({ props: p, variables: v }): ICSSInJSStyle => ({
    msGridRowAlign: 'center',
    gridColumn: 1,
    msGridColumn: 1,

    ...(p.labelPosition === 'start' && {
      gridColumn: 3,
      msGridColumn: 3,
    }),

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
      ...commonToggleBeforeStyles(v),
      borderColor: p.disabled ? v.disabledToggleIndicatorColor : v.borderColor,
      borderStyle: v.borderStyle,
      borderWidth: v.borderWidth,
      margin: v.togglePadding,
    },

    ...(p.checked && {
      borderColor: v.checkedBorderColor,
      background: v.checkedBackground,
      ':before': {
        ...commonToggleBeforeStyles(v),
        margin: v.toggleCheckedPadding,
        background: v.checkedIndicatorColor,
      },
    }),

    ...(p.disabled && {
      background: v.disabledBackground,
      borderColor: v.disabledBorderColor,
      ...(p.checked && {
        background: v.disabledBackgroundChecked,
        borderColor: 'transparent',
        ':before': {
          ...commonToggleBeforeStyles(v),
          margin: v.toggleCheckedPadding,
          background: v.disabledCheckedIndicatorColor,
        },
      }),
    }),
  }),

  label: ({ props: p }): ICSSInJSStyle => ({
    display: 'block', // IE11: should be forced to be block, as inline-block is not supported
    userSelect: 'none',
    gridColumn: 3,
    msGridColumn: 3,

    ...(p.labelPosition === 'start' && {
      gridColumn: 1,
      msGridColumn: 1,
    }),
  }),
};
