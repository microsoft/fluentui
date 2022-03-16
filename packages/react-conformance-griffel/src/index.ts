import { OVERRIDES_WIN_TEST_NAME, overridesWin } from './overridesWin';
import type { TestObject } from './types';

const makeStylesTests: TestObject = {
  [OVERRIDES_WIN_TEST_NAME]: overridesWin,
};

export default makeStylesTests;

export type { OverridesWinTestOptions } from './overridesWin';
