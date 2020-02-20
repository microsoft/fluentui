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
          d="M22.066 8.117c.18.078.342.188.488.328.141.146.25.309.328.488S23 9.302 23 9.5V24H8v-8.5c0-.198.039-.387.117-.566s.19-.342.336-.488c.141-.141.301-.25.48-.328S9.302 14 9.5 14H14V9.5c0-.198.039-.387.117-.566s.19-.342.336-.488c.141-.141.301-.25.48-.328S15.302 8 15.5 8h6c.197 0 .387.039.566.117zM15.5 9a.484.484 0 0 0-.352.148A.483.483 0 0 0 15 9.5V15H9.5a.484.484 0 0 0-.352.148A.483.483 0 0 0 9 15.5V23h7v-4h2v4h4V9.5a.487.487 0 0 0-.148-.352A.487.487 0 0 0 21.5 9h-6zM12 18h-2v-2h2v2zm0 3h-2v-2h2v2zm3-3h-2v-2h2v2zm0 3h-2v-2h2v2zm3-9h-2v-2h2v2zm0 3h-2v-2h2v2zm0 3h-2v-2h2v2zm3-6h-2v-2h2v2zm0 3h-2v-2h2v2zm0 3h-2v-2h2v2zm0 3h-2v-2h2v2z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M21.5 8h-6A1.5 1.5 0 0 0 14 9.5V14H9.5A1.5 1.5 0 0 0 8 15.5V24h8v-5h2v5h5V9.5A1.5 1.5 0 0 0 21.5 8zM12 21h-2v-2h2v2zm0-3h-2v-2h2v2zm3 3h-2v-2h2v2zm0-3h-2v-2h2v2zm3 0h-2v-2h2v2zm0-3h-2v-2h2v2zm0-3h-2v-2h2v2zm3 9h-2v-2h2v2zm0-3h-2v-2h2v2zm0-3h-2v-2h2v2zm0-3h-2v-2h2v2z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
