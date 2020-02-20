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
          d="M15.707 15H18a.5.5 0 0 0 0-1h-3.5a.505.505 0 0 0-.5.5v3.51a.5.5 0 0 0 1 0v-2.303l6.146 6.146a.5.5 0 1 0 .708-.706L15.707 15zm4.793-5h-9c-.827 0-1.5.673-1.5 1.5v9c0 .827.673 1.5 1.5 1.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 1 0v-4c0-.827-.673-1.5-1.5-1.5z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M22.207 20.793L16.914 15.5H18a1 1 0 0 0 0-2h-3.5a.995.995 0 0 0-.196.02c-.029.006-.056.017-.084.025-.034.01-.069.018-.102.032-.033.014-.063.032-.094.049-.026.014-.053.026-.078.043a.987.987 0 0 0-.277.277c-.016.024-.027.049-.04.074-.018.032-.037.063-.052.098-.013.033-.021.066-.031.1-.009.029-.02.057-.026.087a.995.995 0 0 0-.02.196v3.51a1 1 0 0 0 2 0v-1.096l5.293 5.293a.997.997 0 0 0 1.414 0 1 1 0 0 0 0-1.415zM15.5 21h-4a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 1 0v-4c0-.827-.673-1.5-1.5-1.5h-9c-.827 0-1.5.673-1.5 1.5v9c0 .827.673 1.5 1.5 1.5h4a.5.5 0 0 0 0-1z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
