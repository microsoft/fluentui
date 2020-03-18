import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { TeamsCardVariables } from './cardVariables';
import { CardFooterStylesProps } from '../../../../components/Card/CardFooter';

const cardFooterStyles: ComponentSlotStylesPrepared<CardFooterStylesProps, TeamsCardVariables> = {
  root: ({ variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    return {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: v.cardChildMarginBottom
    };
  }
};

export default cardFooterStyles;
