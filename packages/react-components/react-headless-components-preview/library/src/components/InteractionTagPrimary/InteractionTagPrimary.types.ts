import type {
  InteractionTagPrimarySlots as InteractionTagPrimaryBaseSlots,
  InteractionTagPrimaryBaseProps,
  InteractionTagPrimaryBaseState,
  InteractionTagPrimaryContextValues as InteractionTagPrimaryBaseContextValues,
} from '@fluentui/react-tags';

export type InteractionTagPrimarySlots = InteractionTagPrimaryBaseSlots;

export type InteractionTagPrimaryProps = InteractionTagPrimaryBaseProps;

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

export type InteractionTagPrimaryContextValues = InteractionTagPrimaryBaseContextValues;
