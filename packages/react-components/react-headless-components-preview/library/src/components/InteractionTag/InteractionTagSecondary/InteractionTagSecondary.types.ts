import type { InteractionTagSecondaryBaseState } from '@fluentui/react-tags';

export type {
  InteractionTagSecondarySlots,
  InteractionTagSecondaryBaseProps as InteractionTagSecondaryProps,
} from '@fluentui/react-tags';

export type InteractionTagSecondaryState = InteractionTagSecondaryBaseState & {
  root: {
    /**
     * Present when the secondary action is disabled; omitted otherwise.
     */
    'data-disabled'?: string;

    /**
     * Present when the interaction tag is selected; omitted otherwise.
     */
    'data-selected'?: string;
  };
};
