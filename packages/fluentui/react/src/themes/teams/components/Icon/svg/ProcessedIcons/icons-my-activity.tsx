import * as React from 'react'
import cx from 'classnames'
import { TeamsProcessedSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M16.5 22c-.2 0-.4-.2-.5-.4l-2.1-9.4-1.4 3.5c-.1.2-.3.3-.5.3H9c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h2.7l1.9-4.7c.1-.2.3-.3.5-.3s.4.2.4.4l2.1 9.1 2-6.7c.1-.2.2-.3.4-.4.2 0 .4.1.5.2l1.4 2.3H23c.3 0 .5.2.5.5s-.2.6-.5.6h-2.5c-.2 0-.3-.1-.4-.2l-.9-1.5-2.2 7.3c-.1.3-.3.4-.5.4z"
      />
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M16.5 22.5c-.5 0-.9-.3-1-.8l-1.8-7.9-.8 2c-.2.4-.5.6-.9.6H9c-.6 0-1-.4-1-1s.4-1 1-1h2.3L13 10c.2-.4.6-.7 1-.6.4 0 .8.3.9.8l1.6 7.3 1.4-4.8c.1-.4.4-.7.8-.7.4-.1.8.1 1 .5l1.2 2H23c.6 0 1 .4 1 1s-.4 1-1 1h-2.5c-.4 0-.7-.2-.9-.5l-.3-.5-1.9 6.3c-.1.4-.5.7-.9.7z"
      />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
