import { ICSSInJSStyle } from '@fluentui/styles';
import { pxToRem } from '../../../../utils';

export const treeStyles = {
  root: (): ICSSInJSStyle => ({
    display: 'block',
    paddingLeft: `${pxToRem(10)}`,
  }),
};
