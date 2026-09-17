import type { InteractionTagPrimaryBaseState } from '@fluentui/react-tags';

export type {
  InteractionTagPrimarySlots,
  InteractionTagPrimaryBaseProps as InteractionTagPrimaryProps,
  InteractionTagPrimaryContextValues,
} from '@fluentui/react-tags';

export type InteractionTagPrimaryState = InteractionTagPrimaryBaseState & {
  root: {
    /**
     * Present when the primary action is disabled; omitted otherwise.
     */
    'data-disabled'?: string;

    /**
     * Present when the interaction tag is selected; omitted otherwise.
     */
    'data-selected'?: string;

    /**
     * Present when the interaction tag has a secondary action; omitted otherwise.
     */
    'data-has-secondary-action'?: string;
  };
};
