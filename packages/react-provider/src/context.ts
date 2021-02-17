import { Theme } from '@fluentui/react-theme';
import * as React from 'react';

export class Telemetry {
  public tokens: Record<string, boolean> = {};
}

export interface FluentProviderContextValue {
  /** Sets the direction of text & generated styles. */
  dir: 'ltr' | 'rtl';

  /** Provides the document, can be undefined during SSR render. */
  document: Document | undefined;

  telemetry?: Telemetry;
}

export interface FluentThemeProviderValue extends Theme {}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const internal__FluentProviderContext = React.createContext<FluentProviderContextValue>({
  document: typeof document === 'object' ? document : undefined,
  dir: 'ltr',
});

export function useFluent(): FluentProviderContextValue {
  return React.useContext(internal__FluentProviderContext);
}
