import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { pxToRem } from '../../../../utils';
import { DividerContentStylesProps } from 'src/components/Divider/DividerContent';

const dividerContentStyles: ComponentSlotStylesPrepared<DividerContentStylesProps> = {
  root: ({ props, variables }): ICSSInJSStyle => ({
    marginLeft: pxToRem(20),
    marginRight: pxToRem(20),
  }),
};

export default dividerContentStyles;
