import type {
  SearchBoxProps as SearchBoxBaseProps,
  SearchBoxState as SearchBoxBaseState,
} from '@fluentui/react-headless-components-preview/search-box';
export type { SearchBoxSlots } from '@fluentui/react-headless-components-preview/search-box';

export type SearchBoxProps = SearchBoxBaseProps & {
  /**
   * Controls the colors and borders of the search box.
   *
   * @default 'outline'
   */
  appearance?:
    | 'outline'
    | 'underline'
    | 'filled-darker'
    | 'filled-lighter'
    | 'filled-darker-shadow'
    | 'filled-lighter-shadow';

  /**
   * Size of the search box.
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
};

export type SearchBoxState = SearchBoxBaseState & {
  appearance: NonNullable<SearchBoxProps['appearance']>;
  size: NonNullable<SearchBoxProps['size']>;
  root: SearchBoxBaseState['root'] & {
    'data-appearance': NonNullable<SearchBoxProps['appearance']>;
    'data-invalid'?: string;
    'data-size': NonNullable<SearchBoxProps['size']>;
  };
};
