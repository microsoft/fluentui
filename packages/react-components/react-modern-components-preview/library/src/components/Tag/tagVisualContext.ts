'use client';

import * as React from 'react';
import type { TagProps } from './Tag.types';

export type TagVisualContextValue = {
  appearance?: NonNullable<TagProps['appearance']>;
  shape?: NonNullable<TagProps['shape']>;
  size?: NonNullable<TagProps['size']>;
};

const defaultTagVisualContextValue: TagVisualContextValue = {};

export const TagGroupVisualContext = React.createContext<TagVisualContextValue | undefined>(undefined);
export const InteractionTagVisualContext = React.createContext<TagVisualContextValue | undefined>(undefined);

export const useTagGroupVisualContext = (): TagVisualContextValue =>
  React.useContext(TagGroupVisualContext) ?? defaultTagVisualContextValue;
export const useInteractionTagVisualContext = (): TagVisualContextValue =>
  React.useContext(InteractionTagVisualContext) ?? defaultTagVisualContextValue;
