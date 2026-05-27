import type { InteractionTagSecondaryBaseState } from '@fluentui/react-tags';

export type {
  InteractionTagSecondarySlots,
  InteractionTagSecondaryBaseProps as InteractionTagSecondaryProps,
} from '@fluentui/react-tags';

export type InteractionTagSecondaryState = InteractionTagSecondaryBaseState & {
  root: {
    /**
     * Data attribute set when the secondary action is disabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute set when the interaction tag is selected.
     */
    'data-selected'?: string;
  };
};
