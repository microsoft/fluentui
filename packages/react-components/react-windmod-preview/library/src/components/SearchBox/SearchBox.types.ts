import type {
  SearchBoxProps as SearchBoxHeadlessProps,
  SearchBoxState as SearchBoxHeadlessState,
} from '@fluentui/react-headless-components-preview/search-box';

import type { InputAppearance, InputSize } from '../Input/Input.types';

export type { SearchBoxSlots } from '@fluentui/react-headless-components-preview/search-box';

/**
 * Windmod SearchBox props: the headless search box plus the look props the headless surface
 * deliberately omits (they exist purely to select styles). Both are Input's.
 */
export type SearchBoxProps = SearchBoxHeadlessProps & {
  /** @default 'outline' */
  appearance?: InputAppearance;
  /** @default 'medium' */
  size?: InputSize;
};

/** Windmod SearchBox state: headless state plus the resolved look props. */
export type SearchBoxState = SearchBoxHeadlessState & Required<Pick<SearchBoxProps, 'appearance' | 'size'>>;
