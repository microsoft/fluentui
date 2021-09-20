import { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';
import { MenuGroupContextValue } from '../../contexts/menuGroupContext';

export type MenuGroupSlots = {
  root: IntrinsicShorthandProps<'div'>;
};

export interface MenuGroupProps extends ComponentProps<MenuGroupSlots> {}

export interface MenuGroupState extends ComponentState<MenuGroupSlots> {
  /**
   * id applied to the DOM element of `MenuGroupHeader`
   */
  headerId: string;
}

export interface MenuGroupContextValues {
  menuGroup: MenuGroupContextValue;
}
