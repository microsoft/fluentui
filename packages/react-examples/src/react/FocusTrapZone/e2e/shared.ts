import * as React from 'react';
import type { IFocusTrapZoneProps } from '@fluentui/react';

/**
 * Globals set by some of the stories. A story may set some or none of these.
 */
type FTZTestGlobals = {
  /** Sets props of the FocusTrapZone (used by several stories) */
  setProps?: (props: IFocusTrapZoneProps) => void;
  /** Calls FocusTrapZone's imperative `focus()` method on a `componentRef` (used by Focusing story) */
  imperativeFocus?: () => void;
  /** Gets `FocusTrapZone.focusStack` (used by FocusStack story) */
  getFocusStack?: () => string[];
};

/**
 * Window with zero or more extra functions defined by some of the stories.
 */
export type FTZTestWindow = Window & FTZTestGlobals;

/**
 * Define a global function on `window` and clean it up after the test finishes.
 * NOTE: This only runs once (updates to the function are not respected).
 */
export function useGlobal<TKey extends keyof FTZTestGlobals>(name: TKey, func: Required<FTZTestGlobals>[TKey]) {
  React.useEffect(() => {
    (window as any)[name] = func;
    return () => {
      // Clean up the global to avoid timing issues where a test tries to call the version of a
      // global defined by a previous test (this can happen in headless mode)
      delete (window as any)[name];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run on mount
  }, []);
}

/**
 * Define a global `window.setProps` to set FocusTrapZone props for the story, and clean it up
 * after the test finishes.
 * @returns the latest FocusTrapZone props
 */
export function useProps() {
  const [props, setProps] = React.useState<IFocusTrapZoneProps | undefined>();
  useGlobal('setProps', setProps);
  return props;
}
