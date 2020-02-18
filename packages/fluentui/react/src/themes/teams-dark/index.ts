import { createTheme, mergeThemes } from '@fluentui/styles'
import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import teams from '../teams'

export default mergeThemes(
  teams,
  createTheme(
    {
      siteVariables,
      componentVariables,
    },
    'teams-dark',
  ),
)
