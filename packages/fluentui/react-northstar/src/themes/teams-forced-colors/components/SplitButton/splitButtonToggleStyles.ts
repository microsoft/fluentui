import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { SplitButtonToggleStylesProps } from '../../../../components/SplitButton/SplitButtonToggle';
import { SplitButtonVariables } from '../../../teams/components/SplitButton/splitButtonVariables';
import { toggleIndicatorUrl } from '../../../teams/components/SplitButton/toggleIndicatorUrl';

const getIndicatorStyles = (color: string, outline: boolean, size: string): ICSSInJSStyle => {
  return {
    content: '""',
    width: size,
    height: size,
    backgroundImage: toggleIndicatorUrl(color, outline),
    backgroundRepeat: 'no-repeat',
  };
};

export const splitButtonToggleStyles: ComponentSlotStylesPrepared<SplitButtonToggleStylesProps, SplitButtonVariables> =
  {
    root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
      const { siteVariables } = theme;
      const { borderWidth } = siteVariables;

      return {
        ':before': {
          ...getIndicatorStyles(p.disabled ? 'GrayText' : 'ButtonText', true, v.toggleButtonIndicatorSize),
        },

        ...(p.primary && {
          borderWidth,
          borderColor: `transparent`,
        }),

        ...(p.disabled && {
          borderWidth,
          borderColor: `transparent`,
        }),
      };
    },
  };
