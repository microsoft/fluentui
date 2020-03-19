import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CardVariables } from './cardVariables';
import { CardStylesProps } from '../../../../components/Card/Card';
import { pxToRem } from '../../../../utils';

const cardStyles: ComponentSlotStylesPrepared<CardStylesProps, CardVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      padding: v.cardPadding,
      ...(p.horizontal && { flexDirection: 'row' }),
      ...(p.compact && { padding: 0 }),
      ...(p.centered && { alignItems: 'center' }),

      // TODO: update with latest design spec
      width: pxToRem(300),
      border: '1px solid black'
    };
  }
};

export default cardStyles;
