import * as React from 'react';
import { Types } from 'tabster';

// NOTE: very likely contents will change as usage is specced out properly
// creating for now to unblock initial experimentation and usage

/**
 * Context value, all members here can be undefined since the API relies heavily on window/document which are not
 * present during server render in SSR
 */
export interface TabsterContextValue {
  /**
   * Ability helpers focusable API
   */
  focusable?: Types.FocusableAPI;

  /**
   * Raw Ability helpers instance
   */
  tabsterInstance?: Types.TabsterCore;
}

export const TabsterContext = React.createContext<TabsterContextValue>({} as TabsterContextValue);

/**
 * Exposes the entire focus management context
 * Should be used in the package but not exported in the public API
 */
export const useTabsterContext = () => React.useContext(TabsterContext);
