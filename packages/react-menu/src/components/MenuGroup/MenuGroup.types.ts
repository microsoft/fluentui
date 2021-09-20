import { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';
import { MenuGroupContextValue } from '../../contexts/menuGroupContext';

export type MenuGroupSlots = {
  root: IntrinsicShorthandProps<'div'>;
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
