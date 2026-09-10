import type { TestObject } from './types';
import { CUSTOM_STYLE_HOOK_CALLED_TEST_NAME, customStyleHookCalled } from './customStyleHookCalled';

/**
 * Opts a component into the custom style hook conformance test during the pilot.
 */
export function customStyleHookTests<TProps extends {}>(): TestObject<TProps> {
  return {
    [CUSTOM_STYLE_HOOK_CALLED_TEST_NAME]: customStyleHookCalled,
  };
}
