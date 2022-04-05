import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { MenuGroupContextValue } from '../../contexts/menuGroupContext';

export type MenuGroupSlots = {
  root: Slot<'div'>;
};

export type MenuGroupProps = ComponentProps<MenuGroupSlots>;

export type MenuGroupState = ComponentState<MenuGroupSlots> & {
  /**
   * id applied to the DOM element of `MenuGroupHeader`
   */
  headerId: string;
};

export type MenuGroupContextValues = {
  menuGroup: MenuGroupContextValue;
};
