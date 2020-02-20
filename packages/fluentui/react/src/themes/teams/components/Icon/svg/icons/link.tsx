import * as React from 'react'
import cx from 'classnames'
import { TeamsProcessedSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(teamsIconClassNames.outline, classes.outlinePart)}
          d="M16 11h-4c-1.93 0-3.5 1.57-3.5 3.5 0 1.58 1.06 2.903 2.5 3.337v-1.049A2.501 2.501 0 0 1 9.5 14.5c0-1.378 1.121-2.5 2.5-2.5h4c1.379 0 2.5 1.122 2.5 2.5S17.379 17 16 17h-1v1h1c1.93 0 3.5-1.57 3.5-3.5S17.93 11 16 11z"
        />
        <path
          className={cx(teamsIconClassNames.outline, classes.outlinePart)}
          d="M21 14.163v1.049a2.501 2.501 0 0 1 1.5 2.288c0 1.379-1.121 2.5-2.5 2.5h-4a2.502 2.502 0 0 1-2.5-2.5c0-1.378 1.121-2.5 2.5-2.5h1v-1h-1c-1.93 0-3.5 1.57-3.5 3.5S14.07 21 16 21h4c1.93 0 3.5-1.57 3.5-3.5 0-1.58-1.06-2.903-2.5-3.337z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M21 13.642v2.136c.595.347 1 .985 1 1.722 0 1.103-.897 2-2 2h-4c-1.103 0-2-.897-2-2s.897-2 2-2h1v-2h-1c-2.206 0-4 1.794-4 4s1.794 4 4 4h4c2.206 0 4-1.794 4-4 0-1.858-1.28-3.41-3-3.858z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M16 10.5h-4c-2.206 0-4 1.794-4 4 0 1.858 1.28 3.41 3 3.858v-2.136c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2h4c1.103 0 2 .897 2 2s-.897 2-2 2h-1v2h1c2.206 0 4-1.794 4-4s-1.794-4-4-4z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
