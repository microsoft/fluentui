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
          d="M11 13c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1zm5-1c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1zm5 1c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1zm-4 3v3.7c0 .1-.4.3-1 .3s-1-.3-1-.3V16m3-1h-4v4.7c0 .9.9 1.3 2 1.3s2-.4 2-1.3V15zm1.8 5h-.3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h.3c.3 0 1.3-.1 1.3-.7v-1.4h-1.6c-.3 0-.5-.2-.5-.5s.2-.5.5-.5H22v2.3c0 1.2-.9 1.8-2.2 1.8zm-7.3 0h-.3c-1.3 0-2.2-.6-2.2-1.7V16h2.5c.3 0 .5.2.5.5s-.2.5-.5.5h-1.6v1.4c0 .7 1 .7 1.3.7h.3c.3 0 .5.2.5.5s-.2.4-.5.4z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M16 14c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1zm5 1c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1zm-10 0c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1zm3 4.7c0 .9.9 1.3 2 1.3s2-.4 2-1.3V15h-4v4.7zM12.5 16H10v2.3c0 1.1.9 1.7 2.2 1.7h.3c.3 0 .5-.1.5-.4v-3.1c0-.3-.2-.5-.5-.5zm6.5.4v3.1c0 .3.2.5.5.5h.3c1.3 0 2.2-.6 2.2-1.8v-2.3h-2.5c-.3 0-.5.2-.5.5z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
