import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CardVariables } from './cardVariables';
import { CardStylesProps } from '../../../../components/Card/Card';

const cardStyles: ComponentSlotStylesPrepared<CardStylesProps, CardVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      ...(p.horizontal && { flexDirection: 'row' }),
      ...(!p.compact && { padding: v.cardPadding }),
      ...(p.centered && { alignItems: 'center' })
    };
  }
};

export default cardStyles;
