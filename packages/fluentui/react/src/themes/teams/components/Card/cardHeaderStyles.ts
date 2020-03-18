import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { TeamsCardVariables } from './cardVariables';
import { CardHeaderStylesProps } from '../../../../components/Card/CardHeader';

const cardHeaderStyles: ComponentSlotStylesPrepared<CardHeaderStylesProps, TeamsCardVariables> = {
  root: ({ variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    return {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: v.cardChildMarginBottom
    };
  }
};

export default cardHeaderStyles;
