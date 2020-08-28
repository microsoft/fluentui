import * as _ from 'lodash';

import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { HeaderDescriptionStylesProps } from '../../../../components/Header/HeaderDescription';
import { HeaderDescriptionVariables } from './headerDescriptionVariables';
import { pxToRem } from '../../../../utils';

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
