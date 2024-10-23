import * as React from 'react';

/**
 * Defines options for a message to be announced.
 */
export type AnnounceOptions = {
  alert?: boolean;

  /**
   * A unique identifier for the message. If a message with the same id is already announced, it will be replaced.
   */
  batchId?: string;

  /**
   * Indicates that the message announcement can be interrupted by another message and will be announced only
   * user is idle.
   */
  polite?: boolean;

  /** Defines the priority of the message. Higher priority messages will be announced first. */
  priority?: number;
};

export type AnnounceContextValue = {
  announce: (message: string, options?: AnnounceOptions) => void;
};

/**
 * @internal
 */
const AnnounceContext = React.createContext<AnnounceContextValue | undefined>(undefined);

export const AnnounceProvider = AnnounceContext.Provider;

/**
 * Returns a function that can be used to announce messages to screen readers.
 */
export function useAnnounce(): AnnounceContextValue {
  return React.useContext(AnnounceContext) ?? { announce: () => undefined };
}
