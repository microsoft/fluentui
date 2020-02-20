import * as React from 'react'
import cx from 'classnames'
import { TeamsProcessedSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg
      role="presentation"
      focusable="false"
      viewBox="8 8 16 16"
      className={classes.svg}
      aria-labelledby="icons_insert_table"
    >
      <g>
        <path d="M23 8H9a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1zm-9 10v-4h4v4h-4zm4 1v4h-4v-4h4zm-4-6V9h4v4h-4zM9 9h4v4H9V9zm4 5v4H9v-4h4zm-4 5h4v4H9v-4zm10 4v-4h4v4h-4zm4-5h-4v-4h4v4zm-4-5V9h4v4h-4z" />
        <g className={cx(teamsIconClassNames.filled, classes.filledPart)}>
          <path d="M14 19h4v5h-4zM14 8h4v5h-4zM8 14h5v4H8zM19 13h5V9a1 1 0 0 0-1-1h-4v5zM14 14h4v4h-4zM13 19H8v4a1 1 0 0 0 1 1h4v-5zM19 14h5v4h-5zM19 19v5h4a1 1 0 0 0 1-1v-4h-5zM13 13V8H9a1 1 0 0 0-1 1v4h5z" />
        </g>
      </g>
    </svg>
  ),
  styles: {},
  exportedAs: 'table',
} as TeamsProcessedSvgIconSpec
