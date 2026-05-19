import type {
  InteractionTagSecondarySlots as InteractionTagSecondaryBaseSlots,
  InteractionTagSecondaryBaseProps,
  InteractionTagSecondaryBaseState,
} from '@fluentui/react-tags';

export type InteractionTagSecondarySlots = InteractionTagSecondaryBaseSlots;

export type InteractionTagSecondaryProps = InteractionTagSecondaryBaseProps;

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
