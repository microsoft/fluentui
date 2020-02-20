import * as React from 'react'
import cx from 'classnames'
import { TeamsProcessedSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M22.5 22H15V10.707l3.147 3.146a.498.498 0 0 0 .707 0 .5.5 0 0 0 0-.707l-4-4a.5.5 0 0 0-.707 0l-4 4a.5.5 0 1 0 .707.707L14 10.707V22.5a.5.5 0 0 0 .5.5h8a.5.5 0 1 0 0-1z"
      />
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M22.5 21.5h-7v-9.586l2.293 2.293a.997.997 0 0 0 1.414 0 1 1 0 0 0 0-1.414l-4-4a1 1 0 0 0-1.414 0l-4 4a1 1 0 1 0 1.414 1.414l2.293-2.293V22.5a1 1 0 0 0 1 1h8a1 1 0 0 0 0-2z"
      />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
