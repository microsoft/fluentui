import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { ButtonStylesProps } from '../../../../components/Button/Button';
import { ButtonVariables } from '../../../teams/components/Button/buttonVariables';

export const buttonStyles: ComponentSlotStylesPrepared<ButtonStylesProps, ButtonVariables> = {
  root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
    return {
      ...(p.primary && {
        forcedColorAdjust: 'none',
      }),

      ':hover': {
        forcedColorAdjust: 'none',
      },

      ':active': {
        forcedColorAdjust: 'none',
      },

      ':focus-visible': {
        forcedColorAdjust: 'none',
      },
    };
  },
};
