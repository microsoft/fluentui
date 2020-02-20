import * as React from 'react'
import cx from 'classnames'
import { TeamsProcessedSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <g className={cx(teamsIconClassNames.outline, classes.outlinePart)}>
          <path d="M16.5 18.008a.5.5 0 0 0-.5.5v3.064c0 .236-.224.428-.498.428h-4.298c-.235 0-.436-.142-.49-.344C10.24 19.889 10 17.986 10 16c0-1.986.24-3.889.714-5.655.054-.203.255-.345.49-.345H15.5c.275 0 .499.192.499.429v2.079a.5.5 0 0 0 1 0v-2.08C17 9.642 16.328 9 15.502 9h-4.298c-.686 0-1.285.447-1.456 1.086C9.252 11.936 9 13.926 9 16s.252 4.064.748 5.914c.17.64.77 1.086 1.456 1.086H15.5c.827 0 1.499-.64 1.499-1.428v-3.064a.5.5 0 0 0-.5-.5z" />
          <path d="M23.354 15.146l-2.5-2.5a.5.5 0 1 0-.707.707L21.793 15H14.5a.5.5 0 0 0 0 1h7.293l-1.647 1.647a.5.5 0 1 0 .707.707l2.5-2.5a.5.5 0 0 0 0-.707z" />
        </g>
        <g className={cx(teamsIconClassNames.filled, classes.filledPart)}>
          <path d="M16.5 18.008a.5.5 0 0 0-.5.5v3.064c0 .236-.224.428-.498.428h-4.298c-.235 0-.436-.142-.49-.344C10.24 19.889 10 17.986 10 16c0-1.986.24-3.889.714-5.655.054-.203.255-.345.49-.345H15.5c.275 0 .499.192.499.429v2.079a.5.5 0 0 0 1 0v-2.08C17 9.642 16.328 9 15.502 9h-4.298c-.686 0-1.285.447-1.456 1.086C9.252 11.936 9 13.926 9 16s.252 4.064.748 5.914c.17.64.77 1.086 1.456 1.086H15.5c.827 0 1.499-.64 1.499-1.428v-3.064a.5.5 0 0 0-.5-.5z" />
          <path d="M23.707 14.793l-2.5-2.5a1 1 0 1 0-1.414 1.414l.793.793H14a1 1 0 0 0 0 2h6.586l-.793.793a1 1 0 1 0 1.414 1.414l2.5-2.5a1 1 0 0 0 0-1.414z" />
        </g>
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
