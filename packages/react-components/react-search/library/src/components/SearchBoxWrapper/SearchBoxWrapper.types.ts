import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

export type SearchBoxWrapperSlots = {
  /** The root slot */
  root: NonNullable<Slot<'div'>>;
  searchBox: NonNullable<Slot<'div'>>;
  resultListDropdown?: Slot<typeof >;
};

export type SearchBoxWrapperProps = ComponentProps<Partial<>> & {
  showResultsDropdown?: boolean;
  characterCountBeforeSearch?: number;
};

export type SearchBoxWrapperState = ComponentState<> & {};
