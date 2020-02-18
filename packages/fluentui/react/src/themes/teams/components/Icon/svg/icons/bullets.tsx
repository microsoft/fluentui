import * as React from 'react'
import cx from 'classnames'
import { TeamsSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg
      role="presentation"
      focusable="false"
      viewBox="8 8 16 16"
      className={classes.svgFlippingInRtl}
    >
      <g>
        <g className={cx(teamsIconClassNames.outline, classes.outlinePart)}>
          <path d="M13.5 11h9a.5.5 0 1 0 0-1h-9a.5.5 0 1 0 0 1zM22.5 15h-9a.5.5 0 1 0 0 1h9a.5.5 0 1 0 0-1zM22.5 20h-9a.5.5 0 1 0 0 1h9a.5.5 0 1 0 0-1z" />
          <circle cx="10.5" cy="10.5" r="1" />
          <circle cx="10.5" cy="20.5" r="1" />
          <circle cx="10.5" cy="15.5" r="1" />
        </g>
        <g className={cx(teamsIconClassNames.filled, classes.filledPart)}>
          <path d="M13.5 11.25h9a.75.75 0 0 0 0-1.5h-9a.75.75 0 0 0 0 1.5zM22.5 14.75h-9a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5zM22.5 19.75h-9a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5z" />
          <circle cx="10.5" cy="10.5" r="1" />
          <circle cx="10.5" cy="15.5" r="1" />
          <circle cx="10.5" cy="20.5" r="1" />
        </g>
      </g>
    </svg>
  ),
  styles: {},
} as TeamsSvgIconSpec
