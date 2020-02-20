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
          d="M22.055 15.867c0 .25-.062.49-.184.719a1.465 1.465 0 0 1-.496.547l-7.055 4.625c-.245.167-.519.25-.82.25-.203 0-.395-.04-.574-.121a1.574 1.574 0 0 1-.805-.805 1.381 1.381 0 0 1-.121-.574V11.43c0-.203.04-.395.121-.574a1.604 1.604 0 0 1 .805-.805 1.457 1.457 0 0 1 1.371.113l7.055 4.445a1.517 1.517 0 0 1 .703 1.258zm-1 .008a.487.487 0 0 0-.234-.422l-7.055-4.445a.522.522 0 0 0-.266-.078.49.49 0 0 0-.348.148.476.476 0 0 0-.152.352v9.078c0 .136.051.253.152.352.102.1.22.148.355.148a.458.458 0 0 0 .266-.086l7.055-4.625a.531.531 0 0 0 .227-.422z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M22.055 15.867c0 .25-.062.49-.184.719a1.465 1.465 0 0 1-.496.547l-7.055 4.625c-.245.167-.519.25-.82.25-.203 0-.395-.04-.574-.121a1.574 1.574 0 0 1-.805-.805 1.381 1.381 0 0 1-.121-.574V11.43c0-.203.04-.396.121-.578.081-.182.188-.341.324-.477a1.56 1.56 0 0 1 .477-.324 1.457 1.457 0 0 1 1.375.113l7.055 4.445c.219.136.391.316.516.543s.187.465.187.715z"
        />
      </g>
    </svg>
  ),
  exportedAs: 'play',
  styles: {},
} as TeamsProcessedSvgIconSpec
