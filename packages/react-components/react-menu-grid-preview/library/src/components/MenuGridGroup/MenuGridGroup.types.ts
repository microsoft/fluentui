import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { MenuGridGroupContextValue } from '../../contexts/menuGridGroupContext';

export type MenuGridGroupSlots = {
  root: Slot<'div'>;
};

export type MenuGridGroupProps = ComponentProps<MenuGridGroupSlots>;

export type MenuGridGroupState = ComponentState<MenuGridGroupSlots> & {
  /**
   * id applied to the DOM element of `MenuGridGroupHeader`
   */
  headerId: string;
};

export type MenuGridGroupContextValues = {
  MenuGridGroup: MenuGridGroupContextValue;
};
