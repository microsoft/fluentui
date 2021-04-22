import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { ToolbarVariables } from './toolbarVariables';
import { ToolbarStylesProps } from '../../../../components/Toolbar/Toolbar';
import { pxToRem } from '../../../../utils/index';

export const toolbarStyles: ComponentSlotStylesPrepared<ToolbarStylesProps, ToolbarVariables> = {
  root: (): ICSSInJSStyle => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  }),

  offsetMeasure: (): ICSSInJSStyle => ({
    position: 'absolute',
    visibility: 'hidden',
    left: 0,
    top: 0,
  }),

  overflowContainer: () => ({
    display: 'flex',
    overflow: 'hidden',
    flexGrow: 1,
  }),

  overflowSentinel: ({ props }) => ({
    width: pxToRem(100),
    display: props.overflowOpen ? 'block' : 'none',
    visibility: 'hidden',
  }),
};
