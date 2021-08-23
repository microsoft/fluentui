import { pxToRem } from '../../../../utils/index';
import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { ToolbarVariables } from './toolbarVariables';
import type { ToolbarStylesProps } from '../../../../components/Toolbar/Toolbar';

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
