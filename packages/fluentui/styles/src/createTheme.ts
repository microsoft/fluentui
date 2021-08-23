import { withDebugId } from './withDebugId';
import type { ThemeInput, ThemePrepared } from './types';

export const createTheme = <T = ThemeInput | ThemePrepared>(themeInput: T, debugId): T => {
  return withDebugId(themeInput, debugId);
};
