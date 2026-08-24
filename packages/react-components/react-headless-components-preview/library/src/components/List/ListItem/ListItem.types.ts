import type { ListItemBaseState } from '@fluentui/react-list';

export type {
  ListItemBaseSlots as ListItemSlots,
  ListItemBaseProps as ListItemProps,
  ListItemValue,
  ListItemActionEventData,
} from '@fluentui/react-list';

export type ListItemState = ListItemBaseState & {
  root: {
    /**
     * Data attribute set when the parent list manages selection.
     */
    'data-selectable'?: string;
    /**
     * Data attribute set when the item is part of the parent list's focus order.
     */
    'data-navigable'?: string;
    /**
     * Data attribute set when the item is selected.
     */
    'data-selected'?: string;
    /**
     * Data attribute set when the item cannot be selected and exposes no action.
     */
    'data-disabled'?: string;
  };
};
