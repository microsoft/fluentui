import * as React from 'react'
import cx from 'classnames'
import { TeamsProcessedSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M21.5 20h-11a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5zM11 19h10v-6H11zm11.5 3h-1a.5.5 0 0 1 0-1h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 1 1 0v1a1.5 1.5 0 0 1-1.5 1.5zm1-9a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 1 0-1h1a1.5 1.5 0 0 1 1.5 1.5v1a.5.5 0 0 1-.5.5zm-15 0a.5.5 0 0 1-.5-.5v-1A1.5 1.5 0 0 1 9.5 10h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 1-.5.5zm2 9h-1A1.5 1.5 0 0 1 8 20.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 1 0 1z"
      />
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M22.5 22h-1a.5.5 0 0 1 0-1h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 1 1 0v1a1.5 1.5 0 0 1-1.5 1.5zm1-9a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 1 0-1h1a1.5 1.5 0 0 1 1.5 1.5v1a.5.5 0 0 1-.5.5zm-15 0a.5.5 0 0 1-.5-.5v-1A1.5 1.5 0 0 1 9.5 10h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 1-.5.5zm2 9h-1A1.5 1.5 0 0 1 8 20.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 1 0 1z"
      />
      <rect
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        x="10"
        y="12"
        width="12"
        height="8"
        rx=".5"
        ry=".5"
      />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
