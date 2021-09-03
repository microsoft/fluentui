import { ComponentProps, ComponentState, ElementShorthandProps } from '@fluentui/react-utilities';
import { MenuGroupContextValue } from '../../contexts/menuGroupContext';

export type MenuGroupSlots = {
  root: ElementShorthandProps<'div'>;
};

/**
 * {@docCategory MenuGroup}
 */
export interface MenuGroupProps extends ComponentProps<MenuGroupSlots> {}

/**
 * {@docCategory MenuGroup}
 */
export interface MenuGroupState extends ComponentState<MenuGroupSlots> {
  /**
   * id applied to the DOM element of `MenuGroupHeader`
   */
  headerId: string;
}

export interface MenuGroupContextValues {
  menuGroup: MenuGroupContextValue;
}
