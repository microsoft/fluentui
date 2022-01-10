import * as React from 'react';

interface ReactSyntheticEvent extends React.SyntheticEvent<unknown> {
  // React 17/18
  // See https://github.com/facebook/react/pull/19236
  _reactName?: string;

  // React 16
  dispatchConfig?: {
    registrationName: string;
    phasedRegistrationNames: {
      bubbled: string;
      captured: string;
    };
  };
}

type NonUndefined<A> = A extends undefined ? never : A;
type FunctionKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? K : never;
}[keyof T];

export type ReactCallbackName = FunctionKeys<React.DOMAttributes<unknown>>;

/**
 * React.SyntheticEvent contains name of a callback that should be fired, this function returns it.
 *
 * Ideally, it should also distinguish regular and "capture" callbacks, but it's possible only with React 17 as
 * ".eventPhase" there has proper value, see https://github.com/facebook/react/pull/19244. In React 16 all events
 * are handled in bubble phase.
 */
export function getReactCallbackName(event: ReactSyntheticEvent): ReactCallbackName | undefined {
  if (event._reactName) {
    return event._reactName as ReactCallbackName;
  }

  if (event.dispatchConfig) {
    if (event.dispatchConfig.registrationName) {
      return event.dispatchConfig.registrationName as ReactCallbackName;
    }

    return event.dispatchConfig.phasedRegistrationNames.bubbled as ReactCallbackName;
  }

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error([
      'Passed React.SyntheticEvent does not contain ".dispatchConfig" or "._reactName".',
      'This should not happen, please report it to https://github.com/microsoft/fluentui',
    ]);
  }
}
