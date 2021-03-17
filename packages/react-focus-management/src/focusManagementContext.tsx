import * as React from 'react';
import { Types as AHTypes } from 'ability-helpers';

// NOTE: very likely contents will change as usage is specced out properly
// creating for now to unblock initial experimentation and usage

/**
 * Context value, all members here can be undefined since the API relies heavily on window/document which are not
 * present during server render in SSR
 */
export interface FocusManagementContextValue {
  /**
   * Raw Ability helpers instance
   */
  ahInstance?: AHTypes.AbilityHelpersCore;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const internal__FocusManagementContext = React.createContext<FocusManagementContextValue>(
  ({} as unknown) as FocusManagementContextValue,
);

/**
 * Exposes the entire focus management context
 * Should be used in the package but not exported in the public API
 */
export const useFocusManagementContext = (): FocusManagementContextValue =>
  React.useContext(internal__FocusManagementContext);
