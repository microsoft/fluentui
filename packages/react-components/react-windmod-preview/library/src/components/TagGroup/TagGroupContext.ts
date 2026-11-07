'use client';

import * as React from 'react';

import type { TagGroupAppearance, TagGroupSize } from './TagGroup.types';

/** Look values a TagGroup publishes to the Tags below it. */
export type TagGroupContextValue = {
  appearance?: TagGroupAppearance;
  size?: TagGroupSize;
};

const TagGroupContext = React.createContext<TagGroupContextValue | undefined>(undefined);
const tagGroupContextDefaultValue: TagGroupContextValue = {};

export const TagGroupContextProvider = TagGroupContext.Provider;

/**
 * The headless surface exports the provider half of the Griffel tag group context but no reader,
 * so this module supplies one. It is internal — no barrel re-exports it.
 */
export const useTagGroupContext = (): TagGroupContextValue =>
  React.useContext(TagGroupContext) ?? tagGroupContextDefaultValue;
