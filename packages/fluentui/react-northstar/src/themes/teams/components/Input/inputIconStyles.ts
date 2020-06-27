import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { InputIconStylesProps } from '../../../../components/Input/InputIcon';
import { InputVariables } from './inputVariables';
import { PositionProperty } from 'csstype';
import clearIndicatorUrl from './clearIndicatorUrl';
import { pxToRem } from '../../../../utils';

const inputIconStyles: ComponentSlotStylesPrepared<InputIconStylesProps, InputVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    color: v.iconColor,
    outline: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: v.iconPosition as PositionProperty,
    ...(p.error && { color: v.colorError }),
    ...(p.requiredAndSuccessful && {
      color: v.successfulColor,
    }),
    ...(p.disabled && {
      color: v.colorDisabled,
    }),

    ...(p.iconPosition === 'start' && {
      left: v.iconLeft,
    }),
    ...(p.iconPosition === 'end' && {
      right: v.iconRight,
    }),

    ...(p.clearable &&
      p.hasValue && {
        backgroundImage: clearIndicatorUrl(p.disabled ? v.colorDisabled : v.iconColor),
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        width: pxToRem(16),
      }),
  }),
};

export default inputIconStyles;
