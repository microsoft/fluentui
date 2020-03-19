import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { TeamsCardVariables } from './cardVariables';
import { CardTopControlsStylesProps } from '../../../../components/Card/CardTopControls';

const cardTopControlsStyles: ComponentSlotStylesPrepared<CardTopControlsStylesProps, TeamsCardVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => {
    return {
      position: 'absolute',
      top: v.topControlsTop,
      right: v.topControlsRight
    };
  }
};

export default cardTopControlsStyles;
