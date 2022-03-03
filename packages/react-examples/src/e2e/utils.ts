import * as React from 'react';

/**
 * Define a global function on `window` and clean it up after the test finishes.
 * NOTE: This only runs once (updates to the function are not respected).
 */
export function useGlobal<Globals>(name: keyof Globals, func: Required<Globals>[typeof name]) {
  React.useEffect(() => {
    ((window as unknown) as Globals)[name] = func;
    return () => {
      // Clean up the global to avoid timing issues where a test tries to call the version of a
      // global defined by a previous test (this can happen in headless mode)
      delete ((window as unknown) as Globals)[name];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run on mount
  }, []);
}

export type UsePropsGlobals<TProps> = {
  /** Callback allowing a test to update the value returned by `useProps` inside a story. */
  setProps?: (props: TProps) => void;
};

/**
 * Define a global `window.setProps` to set props for the story, and clean it up
 * after the test finishes.
 * @returns the latest props
 */
export function useProps<TProps>() {
  const [props, setProps] = React.useState<TProps | undefined>();
  useGlobal<UsePropsGlobals<TProps>>('setProps' as const, setProps);
  return props;
}
