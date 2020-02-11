import * as React from 'react'
import cx from 'classnames'
import { TeamsProcessedSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g className={cx(teamsIconClassNames.outline, classes.outlinePart)}>
        <path d="M18.4 17.6V20h-4.8v-2.4h4.8m.8-.8h-6.4v4h6.4v-4zM13.3 13.6h5.2v.8h-5.2z" />
        <path d="M18.8 10.1C18.3 8.9 17.2 8 16 8c-1.2 0-2.3.9-2.8 2.1-2.1.2-3.7 2-3.7 4.1v7.6c0 1.2.9 2.1 2.1 2.1h8.9c1.2 0 2.1-.9 2.1-2.1v-7.6c0-2.1-1.7-3.8-3.8-4.1zM16 8.8c.8 0 1.5.5 1.9 1.3h-3.8c.4-.8 1.1-1.3 1.9-1.3zm5.8 13.1c0 .7-.6 1.3-1.3 1.3h-8.9c-.7 0-1.3-.6-1.3-1.3v-7.6c0-1.9 1.5-3.4 3.4-3.4h4.8c1.9 0 3.4 1.5 3.4 3.4v7.6z" />
      </g>
      <g className={cx(teamsIconClassNames.filled, classes.filledPart)}>
        <path d="M13.6 17.6h4.8V20h-4.8z" />
        <path d="M18.8 10.1C18.3 8.9 17.2 8 16 8c-1.2 0-2.3.9-2.8 2.1-2.1.2-3.7 2-3.7 4.1v7.6c0 1.2.9 2.1 2.1 2.1h8.9c1.2 0 2.1-.9 2.1-2.1v-7.6c0-2.1-1.7-3.8-3.8-4.1zM16 8.8c.8 0 1.5.5 1.9 1.3h-3.8c.4-.8 1.1-1.3 1.9-1.3zm-2.7 4.8h5.2v.8h-5.2v-.8zm5.9 7.2h-6.4v-4h6.4v4z" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
