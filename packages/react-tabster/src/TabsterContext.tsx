import * as React from 'react';
import { Types } from 'tabster';
import { isSSR } from '@fluentui/react-utilities';

// NOTE: very likely contents will change as usage is specced out properly
// creating for now to unblock initial experimentation and usage

export type TabsterContextValue = Types.TabsterCore;

/**
 * The context is not returned in case of SSR since the API relies heavily in window/document
 * by default the context is undefined, to ensure tests behaviors.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const internal__TabsterContext = React.createContext<TabsterContextValue | undefined>(undefined);

/**
 * Exposes the entire tabster context
 * Should be used in the package but not exported in the public API.
 */
export function useTabsterContext() {
  const ctx = React.useContext(internal__TabsterContext);
  if (!isSSR()) {
    return ctx;
  }
}
