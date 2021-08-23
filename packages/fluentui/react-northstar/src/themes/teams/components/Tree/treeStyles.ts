import { pxToRem } from '../../../../utils';
import type { ICSSInJSStyle } from '@fluentui/styles';

export const treeStyles = {
  root: (): ICSSInJSStyle => ({
    display: 'block',
    paddingLeft: `${pxToRem(10)}`,
  }),
};
