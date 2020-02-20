import * as React from 'react'
import cx from 'classnames'
import { TeamsProcessedSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M23.354 22.646l-4.63-4.63a5.51 5.51 0 1 0-.707.707l4.63 4.63a.5.5 0 0 0 .707-.707zM14.5 19a4.5 4.5 0 1 1 4.5-4.5 4.5 4.5 0 0 1-4.5 4.5z"
      />
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M15 12h-1v2h-2v1h2v2h1v-2h2v-1h-2v-2z"
      />
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M23.354 22.646l-4.63-4.63a5.51 5.51 0 1 0-.707.707l4.63 4.63a.5.5 0 0 0 .707-.707zM17 15h-2v2h-1v-2h-2v-1h2v-2h1v2h2z"
      />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
