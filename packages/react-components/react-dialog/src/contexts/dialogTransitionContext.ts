import * as React from 'react';
import { TransitionStatus } from 'react-transition-group';

/**
 * @internal
 */
export type DialogTransitionContextValue = TransitionStatus | undefined;

/**
 * @internal
 */
const defaultContextValue: DialogTransitionContextValue = undefined;

// Contexts should default to undefined
/**
 * @internal
 */
export const DialogTransitionContext: React.Context<DialogTransitionContextValue | undefined> = React.createContext<
  DialogTransitionContextValue | undefined
>(undefined);

/**
 * @internal
 */
export const DialogTransitionProvider = DialogTransitionContext.Provider;

/**
 * @internal
 */
export const useDialogTransitionContext_unstable = (): DialogTransitionContextValue => {
  return React.useContext(DialogTransitionContext) ?? defaultContextValue;
};
