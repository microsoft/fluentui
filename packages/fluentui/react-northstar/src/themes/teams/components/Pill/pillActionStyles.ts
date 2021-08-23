import { svgIconClassName } from '@fluentui/react-icons-northstar';
import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { PillActionStylesProps } from '../../../../components/Pill/PillAction';
import type { PillVariables } from './pillVariables';

export const pillActionStyles: ComponentSlotStylesPrepared<PillActionStylesProps, PillVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    border: 'none',
    background: 'transparent',
    margin: v.actionMargin,
    width: v.actionWidth,
    cursor: 'pointer',
    outline: 'none',
    ...((p.size === 'small' || p.size === 'smaller') && {
      width: v.smallOrSmallerActionWidth,
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
