import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { ButtonStylesProps } from '../../../teams/components/Button/buttonStyles';
import { ButtonVariables } from '../../../teams/components/Button/buttonVariables';
import { ButtonHighContrastVariables } from './buttonVariables';

const buttonStyles: ComponentSlotStylesPrepared<ButtonStylesProps, ButtonVariables & ButtonHighContrastVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      // rectangular button defaults
      ...(!p.text && {
        ':focus-visible': {
          backgroundColor: v.backgroundColorFocus,
          color: v.colorHover,
          borderColor: 'transparent',

          '&:hover': {
            color: v.colorHover,
            backgroundColor: v.backgroundColorHover,
            borderColor: 'transparent'
          }
        }
      }),

      // Overrides for "primary" buttons
      ...(p.primary &&
        !p.text && {
          ':focus-visible': {
            backgroundColor: v.primaryBackgroundColorFocus,

            '&:hover': {
              color: v.primaryColorHover,
              backgroundColor: v.primaryBackgroundColorHover
            }
          }
        })
    };
  }
};

export default buttonStyles;
