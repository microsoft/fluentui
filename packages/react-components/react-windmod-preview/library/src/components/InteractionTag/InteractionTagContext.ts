'use client';

import * as React from 'react';

import type { InteractionTagAppearance, InteractionTagShape, InteractionTagSize } from './InteractionTag.types';

/** Look values an InteractionTag publishes to its primary and secondary actions. */
export type InteractionTagContextValue = {
  appearance?: InteractionTagAppearance;
  shape?: InteractionTagShape;
  size?: InteractionTagSize;
};

const InteractionTagContext = React.createContext<InteractionTagContextValue | undefined>(undefined);
const interactionTagContextDefaultValue: InteractionTagContextValue = {};

export const InteractionTagContextProvider = InteractionTagContext.Provider;

/**
 * The headless surface exports the provider half of the Griffel interaction tag context but not
 * the reader, so this module supplies one. It is internal — no barrel re-exports it.
 */
export const useInteractionTagContext = (): InteractionTagContextValue =>
  React.useContext(InteractionTagContext) ?? interactionTagContextDefaultValue;
