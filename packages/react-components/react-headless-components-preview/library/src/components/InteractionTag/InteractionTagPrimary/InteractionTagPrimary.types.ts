import type { InteractionTagPrimaryBaseState } from '@fluentui/react-tags';

export type {
  InteractionTagPrimarySlots,
  InteractionTagPrimaryBaseProps as InteractionTagPrimaryProps,
  InteractionTagPrimaryContextValues,
} from '@fluentui/react-tags';

export type InteractionTagPrimaryState = InteractionTagPrimaryBaseState & {
  root: {
    /**
     * Data attribute set when the primary action is disabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute set when the interaction tag is selected.
     */
    'data-selected'?: string;

    /**
     * Data attribute set when the interaction tag has a secondary action.
     */
    'data-has-secondary-action'?: string;
  };
};
