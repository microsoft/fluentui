import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';
import { OrderedGroupState } from '../../utils/OrderedGroup.types';

export type ListboxSlots = {
  // TODO Add slots here and to listboxShorthandProps in useListbox.ts
  root: IntrinsicShorthandProps<'div'>;
};

type ListboxCommons = {
  // TODO Add things shared between props and state here
};

/**
 * Listbox Props
 */
export type ListboxProps = ComponentProps<ListboxSlots> & ListboxCommons;

/**
 * State used in rendering Listbox
 */
export type ListboxState = ComponentState<ListboxSlots> &
  ListboxCommons &
  OrderedGroupState & {
    activeId: string;
  };
