import * as React from 'react';

export type AnnounceOptions = {
  alert?: boolean;
  batchId?: string;
  polite?: boolean;
  priority?: number;
};

/**
 * @internal
 */
export type AnnounceContextValue<T = AnnounceOptions> = {
  announce?: (message: string, options?: T) => void;
};

/**
 * @internal
 */
const AnnounceContext = React.createContext<AnnounceContextValue | undefined>(undefined);

/**
 * @internal
 */
export const AnnounceProvider = AnnounceContext.Provider;

export function useAnnounce(): AnnounceContextValue {
  return React.useContext(AnnounceContext) ?? {};
}
