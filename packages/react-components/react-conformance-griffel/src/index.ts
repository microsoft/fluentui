import { TestObject } from '@fluentui/react-conformance';
import { OVERRIDES_WIN_TEST_NAME, overridesWin } from './overridesWin';

const makeStylesTests: TestObject = {
  [OVERRIDES_WIN_TEST_NAME]: overridesWin,
};

export default makeStylesTests;

export type { OverridesWinTestOptions } from './overridesWin';
