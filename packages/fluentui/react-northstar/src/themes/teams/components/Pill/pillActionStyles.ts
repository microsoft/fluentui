import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { PillActionStylesProps } from '../../../../components/Pill/PillAction';
import { PillVariables } from './pillVariables';
import { svgIconClassName } from '@fluentui/react-icons-northstar';

export const pillActionStyles: ComponentSlotStylesPrepared<PillActionStylesProps, PillVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    border: 'none',
    background: 'transparent',
    marginLeft: v.actionPadding,
    marginRight: v.actionPadding,
    width: v.actionWidth,
    cursor: 'pointer',

    ...(p.size !== 'medium' && {
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
