import * as React from 'react'
import cx from 'classnames'
import { TeamsProcessedSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M22.5 9.5c-.7-.7-1.9-.7-2.7 0l-5.9 5.9s-.1.1-.1.2l-.8 2.9c0 .1 0 .3.1.4.1.1.2.1.3.1h.1l2.8-.7c.1 0 .1-.1.2-.1l5.9-5.9c.8-.8.8-2 .1-2.8zm-.6 2.2L16 17.5l-2.1.5.5-2.1 5.9-5.9c.4-.4 1.2-.4 1.6 0 .5.5.5 1.2 0 1.7z"
      />
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M20.5 17c-.3 0-.5.2-.5.5v4c0 .3-.2.5-.5.5h-9c-.3 0-.5-.2-.5-.5v-9c0-.3.2-.5.5-.5h4c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-4c-.8 0-1.5.7-1.5 1.5v9c0 .8.7 1.5 1.5 1.5h9c.8 0 1.5-.7 1.5-1.5v-4c0-.3-.2-.5-.5-.5z"
      />
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M22.4 9.6C22 9.2 21.5 9 21 9s-1 .2-1.4.6l-5.9 5.9c-.1.1-.1.1-.1.2l-.7 2.8c0 .2 0 .4.1.5.1.1.2.1.4.1h.1l2.8-.7c.1 0 .2-.1.2-.1l5.9-5.9c.8-.8.8-2 0-2.8zM20.5 17c-.3 0-.5.2-.5.5v4c0 .3-.2.5-.5.5h-9c-.3 0-.5-.2-.5-.5v-9c0-.3.2-.5.5-.5h4c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-4c-.8 0-1.5.7-1.5 1.5v9c0 .8.7 1.5 1.5 1.5h9c.8 0 1.5-.7 1.5-1.5v-4c0-.3-.2-.5-.5-.5z"
      />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
