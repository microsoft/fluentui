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
          d="M23.5 9a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-2a.5.5 0 1 0-1 0v2c0 .827.673 1.5 1.5 1.5H11v3.5c0 .827.673 1.5 1.5 1.5h.5v5.5a.5.5 0 0 0 .757.429l5-3A.5.5 0 0 0 19 20.5V18h.5c.827 0 1.5-.673 1.5-1.5V13h1.5c.827 0 1.5-.673 1.5-1.5v-2a.5.5 0 0 0-.5-.5zM18 20.217l-4 2.4V18h4v2.217zm2-3.717a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5V13h8v3.5z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M23.5 9a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-2a.5.5 0 1 0-1 0v2c0 .827.673 1.5 1.5 1.5H11v3.5c0 .827.673 1.5 1.5 1.5h.5v5.5a.5.5 0 0 0 .757.429l5-3A.5.5 0 0 0 19 20.5V18h.5c.827 0 1.5-.673 1.5-1.5V13h1.5c.827 0 1.5-.673 1.5-1.5v-2a.5.5 0 0 0-.5-.5zM20 16.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5V13h8v3.5z"
        />
      </g>
    </svg>
  ),
  styles: {},
  exportedAs: 'highlight',
} as TeamsProcessedSvgIconSpec
