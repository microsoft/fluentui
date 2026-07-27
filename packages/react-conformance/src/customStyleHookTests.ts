import { TestObject } from './types';
import { CUSTOM_STYLE_HOOK_CALLED_TEST_NAME, customStyleHookCalled } from './customStyleHookCalled';

export const customStyleHookTests: TestObject = {
  [CUSTOM_STYLE_HOOK_CALLED_TEST_NAME]: customStyleHookCalled,
};
