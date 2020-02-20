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
          d="M20.75 15H17v-3.75c0-.28-.22-.5-.5-.5s-.5.22-.5.5V15h-3.75c-.28 0-.5.22-.5.5s.22.5.5.5H16v3.75c0 .28.22.5.5.5s.5-.22.5-.5V16h3.75c.28 0 .5-.22.5-.5s-.22-.5-.5-.5z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M20.75 14.5H17.5v-3.25c0-.55-.45-1-1-1s-1 .45-1 1v3.25h-3.25c-.55 0-1 .45-1 1s.45 1 1 1h3.25v3.25c0 .55.45 1 1 1s1-.45 1-1V16.5h3.25c.55 0 1-.45 1-1s-.45-1-1-1z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
