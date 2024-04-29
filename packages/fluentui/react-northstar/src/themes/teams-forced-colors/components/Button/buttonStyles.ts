import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { ButtonStylesProps } from '../../../../components/Button/Button';
import { ButtonVariables } from '../../../teams/components/Button/buttonVariables';

export const buttonStyles: ComponentSlotStylesPrepared<ButtonStylesProps, ButtonVariables> = {
  root: ({ props: p }): ICSSInJSStyle => {
    return {
      ...(p.iconOnly && {
        border: 'none',
      }),
    };
  },
};
