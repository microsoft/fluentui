import * as React from 'react'
import cx from 'classnames'
import { TeamsSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g className={cx(teamsIconClassNames.filled, classes.filledPart)}>
        <circle cx="22" cy="16" r="2" />
        <circle cx="16" cy="16" r="2" />
        <circle cx="10" cy="16" r="2" />
      </g>
      <g className={cx(teamsIconClassNames.outline, classes.outlinePart)}>
        <circle cx="22" cy="16" r="1.5" />
        <circle cx="16" cy="16" r="1.5" />
        <circle cx="10" cy="16" r="1.5" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsSvgIconSpec
