import type {
  InteractionTagSlots as InteractionTagBaseSlots,
  InteractionTagBaseProps,
  InteractionTagBaseState,
} from '@fluentui/react-tags';
import type { InteractionTagContextValue } from '@fluentui/react-tags';

export type InteractionTagSlots = InteractionTagBaseSlots;

export type InteractionTagProps = InteractionTagBaseProps;

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
