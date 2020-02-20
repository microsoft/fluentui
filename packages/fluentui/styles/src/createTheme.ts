import { ThemeInput, ThemePrepared } from './types'
import withDebugId from './withDebugId'

const createTheme = <T = ThemeInput | ThemePrepared>(themeInput: T, debugId): T => {
  return withDebugId(themeInput, debugId)
}

export default createTheme
