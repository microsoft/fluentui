import { pxToRem } from '../../../../utils';

export default () => {
  const vars: any = {};

  vars.paddingLeft = pxToRem(20);
  vars.paddingRight = pxToRem(18);
  vars.columnGap = pxToRem(8);

  vars.height = pxToRem(48);

  return vars;
};
