import type { InteractionTagBaseState, InteractionTagContextValue } from '@fluentui/react-tags';

export type { InteractionTagSlots, InteractionTagBaseProps as InteractionTagProps } from '@fluentui/react-tags';

export type InteractionTagState = InteractionTagBaseState & {
  root: {
    /**
     * Data attribute set when the interaction tag is disabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute set when the interaction tag is selected.
     */
    'data-selected'?: string;
  };
};

export type InteractionTagContextValues = {
  interactionTag: InteractionTagContextValue;
};
