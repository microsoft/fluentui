import { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';
import { MenuGroupContextValue } from '../../contexts/menuGroupContext';

export type MenuGroupSlots = {
  root: IntrinsicShorthandProps<'div'>;
};

/**
 * {@docCategory MenuGroup}
 */
export type MenuGroupProps = ComponentProps<MenuGroupSlots>;

/**
 * {@docCategory MenuGroup}
 */
export type MenuGroupState = ComponentState<MenuGroupSlots> & {
  /**
   * id applied to the DOM element of `MenuGroupHeader`
   */
  headerId: string;
};

export type MenuGroupContextValues = {
  menuGroup: MenuGroupContextValue;
};
