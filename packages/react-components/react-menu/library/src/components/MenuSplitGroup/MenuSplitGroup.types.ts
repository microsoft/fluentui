import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { MenuSplitGroupContextValue } from '../../contexts/menuSplitGroupContext';

export type MenuSplitGroupSlots = {
  root: Slot<'div'>;
};

export type MenuSplitGroupContextValues = {
  menuSplitGroup: MenuSplitGroupContextValue;
};

/**
 * MenuSplitGroup Props
 */
export type MenuSplitGroupProps = ComponentProps<MenuSplitGroupSlots>;

/**
 * State used in rendering MenuSplitGroup
 */
export type MenuSplitGroupState = ComponentState<MenuSplitGroupSlots> &
  Pick<MenuSplitGroupContextValue, 'setMultiline'>;
