import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { PillActionStylesProps } from '../../../../components/Pill/PillAction';
import { PillVariables } from './pillVariables';
import { svgIconClassName } from '@fluentui/react-icons-northstar';

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
