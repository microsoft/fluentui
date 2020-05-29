import * as _ from 'lodash';
import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { HeaderStylesProps } from '../../../../components/Header/Header';
import { HeaderVariables } from './headerVariables';
import translateAlignProp from '../../../../styles/translateAlignProp';

const headerStyles: ComponentSlotStylesPrepared<HeaderStylesProps, HeaderVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = v.colorScheme[p.color];
    return {
      display: 'block',
      color: _.get(colors, 'foreground', v.color),
      textAlign: translateAlignProp(p.align),
      ...(p.hasDescription && { marginBottom: 0 }),
    };
  },
};

export default headerStyles;
