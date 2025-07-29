import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { MenuGridRowGroupContextValue } from '../../contexts/menuGridRowGroupContext';

export type MenuGridRowGroupSlots = {
  root: Slot<'div'>;
};

export type MenuGridRowGroupProps = ComponentProps<MenuGridRowGroupSlots>;

export type MenuGridRowGroupState = ComponentState<MenuGridRowGroupSlots> & {
  /**
   * id applied to the DOM element of `MenuGridRowGroupHeader`
   */
  headerId: string;
};

export type MenuGridRowGroupContextValues = {
  menuGridRowGroup: MenuGridRowGroupContextValue;
};
