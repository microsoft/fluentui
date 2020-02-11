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
          d="M21.5 18H21v-1.5c0-.8-.7-1.5-1.5-1.5h-3v-1c1.4 0 2.5-1.1 2.5-2.5v-1C19 9.1 17.9 8 16.5 8h-1C14.1 8 13 9.1 13 10.5v1c0 1.4 1.1 2.5 2.5 2.5v1h-3c-.8 0-1.5.7-1.5 1.5V18h-.5C9.1 18 8 19.1 8 20.5v1c0 1.4 1.1 2.5 2.5 2.5h1c1.4 0 2.5-1.1 2.5-2.5v-1c0-1.2-.9-2.2-2-2.4v-1.6c0-.3.2-.5.5-.5h7c.3 0 .5.2.5.5v1.6c-1.1.2-2 1.2-2 2.4v1c0 1.4 1.1 2.5 2.5 2.5h1c1.4 0 2.5-1.1 2.5-2.5v-1c0-1.4-1.1-2.5-2.5-2.5zM14 11.5v-1c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5v1c0 .8-.7 1.5-1.5 1.5h-1c-.8 0-1.5-.7-1.5-1.5zm-1 9v1c0 .8-.7 1.5-1.5 1.5h-1c-.8 0-1.5-.7-1.5-1.5v-1c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5zm10 1c0 .8-.7 1.5-1.5 1.5h-1c-.8 0-1.5-.7-1.5-1.5v-1c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5v1z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M22.5 18H21v-1.5c0-.827-.673-1.5-1.5-1.5h-3v-1h1c.827 0 1.5-.673 1.5-1.5v-3c0-.827-.673-1.5-1.5-1.5h-3c-.827 0-1.5.673-1.5 1.5v3c0 .827.673 1.5 1.5 1.5h1v1h-3c-.827 0-1.5.673-1.5 1.5V18H9.5c-.827 0-1.5.673-1.5 1.5v3c0 .827.673 1.5 1.5 1.5h3c.827 0 1.5-.673 1.5-1.5v-3c0-.827-.673-1.5-1.5-1.5H12v-1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V18h-.5c-.827 0-1.5.673-1.5 1.5v3c0 .827.673 1.5 1.5 1.5h3c.827 0 1.5-.673 1.5-1.5v-3c0-.827-.673-1.5-1.5-1.5z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
