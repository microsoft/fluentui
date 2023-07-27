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
export type AnnounceContextValue = {
  announce: (message: string, options?: AnnounceOptions) => void;
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
  return React.useContext(AnnounceContext) ?? { announce: () => undefined };
}
