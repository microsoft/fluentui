import type { InteractionTagBaseState, InteractionTagContextValue } from '@fluentui/react-tags';

export type { InteractionTagSlots, InteractionTagBaseProps as InteractionTagProps } from '@fluentui/react-tags';

export type InteractionTagState = InteractionTagBaseState & {
  root: {
    /**
     * Present when the interaction tag is disabled; omitted otherwise.
     */
    'data-disabled'?: string;

    /**
     * Present when the interaction tag is selected; omitted otherwise.
     */
    'data-selected'?: string;
  };
};

export type InteractionTagContextValues = {
  interactionTag: InteractionTagContextValue;
};
