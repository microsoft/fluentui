import type { SearchBoxBaseState } from '@fluentui/react-search';

export type { SearchBoxSlots, SearchBoxBaseProps as SearchBoxProps } from '@fluentui/react-search';

/**
 * Search component state
 */
export type SearchBoxState = SearchBoxBaseState & {
  root: {
    /**
     * Present when disabled; omitted otherwise.
     */
    'data-disabled'?: string;

    /**
     * Present when the search box has focus within; omitted otherwise.
     */
    'data-focused'?: string;
  };
};
