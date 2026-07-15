import { TestObject } from '@fluentui/react-conformance';
import { OVERRIDES_WIN_TEST_NAME, overridesWin } from './overridesWin';
import { CUSTOM_STYLE_HOOK_CALLED_TEST_NAME, customStyleHookCalled } from './customStyleHookCalled';

const makeStylesTests: TestObject = {
  [OVERRIDES_WIN_TEST_NAME]: overridesWin,
};

export const customStyleHookTests: TestObject = {
  [CUSTOM_STYLE_HOOK_CALLED_TEST_NAME]: customStyleHookCalled,
};

export default makeStylesTests;

export type { OverridesWinTestOptions } from './overridesWin';
export type { CustomStyleHookCalledTestOptions } from './customStyleHookCalled';
