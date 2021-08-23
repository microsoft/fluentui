import * as _ from 'lodash';
import { pxToRem } from '../../../../utils';
import type { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import type { HeaderDescriptionStylesProps } from '../../../../components/Header/HeaderDescription';
import type { HeaderDescriptionVariables } from './headerDescriptionVariables';

export const headerDescriptionStyles: ComponentSlotStylesPrepared<
  HeaderDescriptionStylesProps,
  HeaderDescriptionVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = v.colorScheme[p.color];
    return {
      display: 'block',
      color: _.get(colors, 'foreground', v.color),
      fontSize: pxToRem(22),
      fontWeight: 400,
    };
  },
};
