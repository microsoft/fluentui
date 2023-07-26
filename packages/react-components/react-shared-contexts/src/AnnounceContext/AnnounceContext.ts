import * as React from 'react';

export type AnnounceOptions = {
  alert?: boolean;
  priority?: number;
  batchId?: string;
};

/**
 * @internal
 */
export type AnnounceContextValue = (message: string, options: AnnounceOptions) => void;

/**
 * @internal
 */
export const AnnounceContext = React.createContext<AnnounceContextValue | undefined>(undefined);

/**
 * @internal
 */
export const AnnounceProvider = AnnounceContext.Provider;

export function useAnnounce(): AnnounceContextValue {
  return React.useContext(AnnounceContext) ?? (() => null);
}
