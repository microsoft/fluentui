import * as _ from 'lodash';
import { translateAlignProp } from '../../../../styles/translateAlignProp';
import type { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import type { HeaderStylesProps } from '../../../../components/Header/Header';
import type { HeaderVariables } from './headerVariables';

export const headerStyles: ComponentSlotStylesPrepared<HeaderStylesProps, HeaderVariables> = {
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
