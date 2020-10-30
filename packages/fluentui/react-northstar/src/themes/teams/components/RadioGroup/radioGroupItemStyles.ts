import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import {
  RadioGroupItemStylesProps,
  radioGroupItemSlotClassNames,
} from '../../../../components/RadioGroup/RadioGroupItem';
import { RadioGroupItemVariables } from './radioGroupItemVariables';
import { pxToRem } from '../../../../utils';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';

const restHoverFocusTextColor = textColor => ({
  color: textColor,

  ':hover': {
    color: textColor,
  },

  ':focus': {
    color: textColor,
  },
});

export const radioGroupItemStyles: ComponentSlotStylesPrepared<RadioGroupItemStylesProps, RadioGroupItemVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    position: 'relative',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: `${pxToRem(1)}`,
    borderColor: 'transparent',
    borderRadius: `${pxToRem(2)}`,
    color: v.textColorDefault,
    cursor: 'pointer',
    display: p.vertical ? 'flex' : 'inline-flex',
    fontSize: v.textFontSize,
    padding: v.padding,

    ':hover': {
      color: v.textColorDefaultHoverFocus,

      [`& .${radioGroupItemSlotClassNames.indicator}`]: {
        borderColor: v.textColorDefaultHoverFocus,

        ...(!p.disabled &&
          !p.checked && {
            borderColor: v.indicatorBorderColorDefaultHover,
          }),
      },
    },

    ':focus': {
      color: v.textColorDefaultHoverFocus,
    },

    ...(p.checked && {
      ...restHoverFocusTextColor(v.textColorChecked),
    }),

    ...(p.disabled && {
      ...restHoverFocusTextColor(v.colorDisabled),
    }),

    ...getBorderFocusStyles({ variables: siteVariables }),
  }),

  indicator: ({ props: p, variables: v }): ICSSInJSStyle => ({
    margin: `0 ${pxToRem(12)} 0 0`,
    outline: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: pxToRem(12),
    height: pxToRem(12),
    verticalAlign: 'midddle',
    color: v.indicatorColorDefault,

    ...(p.checked && {
      color: v.indicatorBackgroundColorChecked,
    }),

    ...(p.disabled && {
      color: v.colorDisabled,
    }),
  }),
};
