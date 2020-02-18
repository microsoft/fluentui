import * as React from 'react'
import cx from 'classnames'
import { TeamsProcessedSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="8 8 16 16">
      <g>
        <path
          className={cx(teamsIconClassNames.outline, classes.outlinePart)}
          d="M8 9h16v1.71l-6 6V23h-4v-6.29l-6-6V9zm15 1.29V10H9v.29l6 6V22h2v-5.71l6-6z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M8 9h16v1.71l-6 6V23h-4v-6.29l-6-6z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
