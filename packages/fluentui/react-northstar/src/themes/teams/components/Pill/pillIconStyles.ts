import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { PillIconStylesProps } from '../../../../components/Pill/PillIcon';
import { PillVariables } from './pillVariables';
import { svgIconClassName } from '@fluentui/react-icons-northstar';

export const pillIconStyles: ComponentSlotStylesPrepared<PillIconStylesProps, PillVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    border: 'none',
    background: 'transparent',
    margin: v.iconMargin,
    width: v.iconWidth,
    cursor: 'pointer',
    outline: 'none',
    ...((p.size === 'small' || p.size === 'smaller') && {
      width: v.smallOrSmallerIconWidth,
    }),

    [`& .${svgIconClassName}`]: {
      height: '100%',
      width: '100%',
      '& svg': {
        height: '100%',
        width: '100%',
      },
    },
  }),
};
