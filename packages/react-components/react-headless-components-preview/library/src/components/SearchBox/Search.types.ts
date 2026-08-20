import type { SearchBoxBaseState } from '@fluentui/react-search';

export type { SearchBoxSlots, SearchBoxBaseProps as SearchBoxProps } from '@fluentui/react-search';

/**
 * Search component state
 */
export type SearchBoxState = SearchBoxBaseState & {
  root: {
    /**
     * Data attribute set when the search box is disabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute set when the search box has focus within.
     */
    'data-focused'?: string;
  };
};
