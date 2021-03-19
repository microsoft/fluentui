import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { PillStylesProps } from '../../../../components/Pill/Pill';
import { PillVariables } from './pillVariables';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';

export const pillStyles: ComponentSlotStylesPrepared<PillStylesProps, PillVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    return {
      display: 'inline-flex',
      borderRadius: v.borderRadiusCircular,
      background: v.background,
      margin: `${v.horizontalMargin} ${v.verticalMargin}`,
      minWidth: v.minWidth,

      ':hover': {
        background: v.backgroundHover,
      },

      ...(p.rounded && {
        borderRadius: v.borderRadiusRounded,
        ...(p.size === 'medium' && {
          borderRadius: v.borderRadiusRoundedMedium,
        }),
      }),

      ...(p.size === 'small' && {
        minWidth: v.minWidthSmall,
        margin: `${v.horizontalMarginSmall} ${v.verticalMarginSmall}`,
      }),

      ...(p.size === 'medium' && {
        minWidth: v.minWidthMedium,
        margin: `${v.horizontalMarginMedium} ${v.verticalMarginMedium}`,
      }),

      ...getBorderFocusStyles({ variables: siteVariables }),
    };
  },
};
