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
          d="M19.5 23c-.1 0-.3 0-.4-.1-2.6-.8-4.8-2.4-6.4-4.6-1.6-2.2-2.3-4.9-2.1-7.6 0-.6.4-1.1.9-1.3l.8-.4c.9-.4 1.9 0 2.3.8l.3.7c.5 1 .8 2.5-.1 3.4l-.6.6c-.2.2-.2.5-.1.7L16 18c.1.2.4.3.6.2l.7-.3c1.3-.5 2.6.3 3.3 1.1l.5.5c.6.7.6 1.8 0 2.4l-.6.7c-.2.3-.6.4-1 .4zm-6-5.2c1.4 2 3.5 3.5 5.8 4.2.2.1.4 0 .5-.1l.6-.7c.3-.3.3-.8 0-1.1l-.4-.5c-.6-.6-1.4-1.1-2.2-.8l-.7.3c-.7.3-1.5.1-1.9-.5l-1.9-2.8c-.4-.6-.4-1.4.2-1.9l.5-.6c.5-.6.3-1.6-.1-2.3l-.3-.7c-.2-.4-.6-.5-1-.4l-.8.4c-.2.1-.3.3-.3.5-.1 2.6.6 5 2 7z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M19.5 23c-.1 0-.3 0-.4-.1-2.6-.8-4.8-2.4-6.4-4.6-1.6-2.2-2.3-4.9-2.1-7.6 0-.6.4-1.1.9-1.3l.8-.4c.9-.4 1.9 0 2.3.8l.3.7c.5 1 .8 2.5-.1 3.4l-.6.6c-.2.2-.2.5-.1.7L16 18c.1.2.4.3.6.2l.7-.3c1.3-.5 2.6.3 3.3 1.1l.5.5c.6.7.6 1.8 0 2.4l-.6.7c-.2.3-.6.4-1 .4z"
        />
      </g>
    </svg>
  ),
  styles: {},
  exportedAs: 'call',
} as TeamsProcessedSvgIconSpec
