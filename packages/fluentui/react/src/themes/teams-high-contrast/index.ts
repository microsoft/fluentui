import { mergeThemes, createTheme } from '@fluentui/styles'
import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import teams from '../teams'

export default mergeThemes(
  teams,
  createTheme(
    {
      siteVariables,
      componentVariables,
      componentStyles,
    },
    'teams-high-contrast',
  ),
)
