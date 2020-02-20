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
          d="M24.019 12.5c0-.4-.156-.777-.439-1.061L20.561 8.42a1.501 1.501 0 0 0-2.121 0l-2.543 2.543A1.5 1.5 0 0 0 14.5 10h-4c-.827 0-1.5.672-1.5 1.5v10c0 .827.673 1.5 1.5 1.5h10c.827 0 1.5-.673 1.5-1.5v-4a1.5 1.5 0 0 0-.964-1.397l2.543-2.543c.283-.283.44-.66.44-1.06zM16 14.139L17.86 16H16v-1.861zM10 11.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V16h-5v-4.5zm.5 10.5a.5.5 0 0 1-.5-.5V17h5v5h-4.5zm10.5-.5c0 .275-.225.5-.5.5H16v-5h4.5c.275 0 .5.225.5.5v4zm1.872-8.647l-3.019 3.02a.49.49 0 0 1-.258.128h-.191a.483.483 0 0 1-.258-.128l-3.019-3.02a.49.49 0 0 1-.128-.259v-.188a.49.49 0 0 1 .128-.259l3.019-3.019a.498.498 0 0 1 .708 0l3.019 3.019a.495.495 0 0 1-.001.706z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M24.019 12.5c0-.4-.156-.777-.439-1.061L20.561 8.42a1.501 1.501 0 0 0-2.121 0l-2.543 2.543A1.5 1.5 0 0 0 14.5 10h-4c-.827 0-1.5.672-1.5 1.5v10c0 .827.673 1.5 1.5 1.5h10c.827 0 1.5-.673 1.5-1.5v-4a1.5 1.5 0 0 0-.964-1.397l2.543-2.543c.283-.283.44-.66.44-1.06zM16 14.139L17.86 16H16v-1.861zM10 11.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V16h-5v-4.5zm.5 10.5a.5.5 0 0 1-.5-.5V17h5v5h-4.5zm10.5-.5c0 .275-.225.5-.5.5H16v-5h4.5c.275 0 .5.225.5.5v4z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
