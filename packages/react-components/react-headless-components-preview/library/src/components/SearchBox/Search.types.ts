import type {
  SearchBoxSlots as SearchBoxBaseSlots,
  SearchBoxBaseProps,
  SearchBoxBaseState,
} from '@fluentui/react-search';

/**
 * Search component slots
 */
export type SearchBoxSlots = SearchBoxBaseSlots;

/**
 * Search component props
 */
export type SearchBoxProps = SearchBoxBaseProps;

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
