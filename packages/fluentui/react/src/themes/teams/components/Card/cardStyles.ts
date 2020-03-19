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
      ...(p.horizontal && { flexDirection: 'row' }),
      ...(!p.compact && { padding: v.cardPadding }),
      ...(p.centered && { alignItems: 'center' }),

      // TODO: update with latest design spec
      width: pxToRem(300),
      border: '1px solid black'
    };
  }
};

export default cardStyles;
