import * as React from 'react'
import cx from 'classnames'
import { TeamsProcessedSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M20.5 8H15c-.4 0-.777.156-1.083.463l-3.478 3.968A1.49 1.49 0 0 0 10 13.49V22.5c0 .827.673 1.5 1.5 1.5h9c.827 0 1.5-.673 1.5-1.5v-13c0-.827-.673-1.5-1.5-1.5zm-6.514 1.9V13H11.27l2.717-3.1zM21 22.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V14h3.986V9.003c.005 0 .01-.003.014-.003h5.5a.5.5 0 0 1 .5.5v13z"
      />
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M20.5 8H15l-.014.001V14H10v8.5c0 .827.673 1.5 1.5 1.5h9c.827 0 1.5-.673 1.5-1.5v-13c0-.827-.673-1.5-1.5-1.5z"
      />
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M13.986 13V8.405c-.022.021-.047.036-.069.058l-3.478 3.968a1.486 1.486 0 0 0-.35.569h3.897z"
      />
    </svg>
  ),
  styles: {},
  exportedAs: 'files-empty',
} as TeamsProcessedSvgIconSpec
