import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { TeamsCardVariables } from './cardVariables';
import { CardBodyStylesProps } from '../../../../components/Card/CardBody';

const cardBodyStyles: ComponentSlotStylesPrepared<CardBodyStylesProps, TeamsCardVariables> = {
  root: ({ variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    return {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: v.cardChildMarginBottom
    };
  }
};

export default cardBodyStyles;
