/**
 * @deprecated Use `canUseDOM` from `@fluentui/utilities` instead.
 */
export let _isSSR = false;

/**
 * Helper to set ssr mode to simulate no window object returned from getWindow helper.
 *
 * @deprecated Use `canUseDOM` from `@fluentui/utilities` instead.
 */
export function setSSR(isEnabled: boolean): void {
  throw new Error(
    'setSSR has been deprecated and is not used in any utilities anymore.' +
      ' Use canUseDOM from @fluentui/utilities instead.',
  );
}
