import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { TeamsCardVariables } from './cardVariables';
import { CardStylesProps } from '../../../../components/Card/Card';

const cardStyles: ComponentSlotStylesPrepared<CardStylesProps, TeamsCardVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      ...(p.horizontal && { flexDirection: 'row' }),
      ...(!p.noPadding && { padding: v.cardPadding }),
      ...(p.center && { alignItems: 'center' })
    };
  }
};

export default cardStyles;
