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
          d="M16 21c-.1 0-.3 0-.4-.1l-7-7c-.2-.2-.2-.5 0-.7s.5-.2.7 0l6.6 6.6 6.6-6.6c.2-.2.5-.2.7 0s.2.5 0 .7l-7 7c.1.1-.1.1-.2.1z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M16 21.5a.997.997 0 0 1-.707-.293l-7-7a.999.999 0 1 1 1.414-1.414L16 19.086l6.293-6.293a.999.999 0 1 1 1.414 1.414l-7 7A.997.997 0 0 1 16 21.5z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
