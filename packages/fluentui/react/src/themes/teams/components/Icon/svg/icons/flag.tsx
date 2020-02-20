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
          d="M12.5,9.5a.514.514,0,0,1,.5.5h7a.5.5,0,0,1,.5.5,18.763,18.763,0,0,1-1.438,3,19.477,19.477,0,0,1,1.438,3,.5.5,0,0,1-.5.5H13v5.5a.5.5,0,0,1-1,0V10A.5.5,0,0,1,12.5,9.5ZM13,11v5h6.188l-1.133-2.273a.5.5,0,0,1,0-.454L19.188,11Z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M12.5,9.5a.514.514,0,0,1,.5.5h7a.5.5,0,0,1,.5.5,23.8,23.8,0,0,1-1.438,3,22.292,22.292,0,0,1,1.438,3,.5.5,0,0,1-.5.5H13v5.5a.5.5,0,0,1-1,0V10A.5.5,0,0,1,12.5,9.5Z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
