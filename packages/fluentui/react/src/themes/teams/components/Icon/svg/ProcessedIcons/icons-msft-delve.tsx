import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path d="M12.716 13.912l-.52.028v4.036l.527.03c.474.026.855-.147 1.136-.523.286-.381.43-.914.43-1.593 0-.642-.143-1.142-.426-1.497-.28-.349-.663-.508-1.147-.481z" />
        <path d="M8.5 10.477v11.046l9 2.079V8.398l-9 2.079zm6.273 7.937c-.512.593-1.172.848-1.966.779l-1.632-.143v-6.188l1.632-.143c1.794-.157 2.759.889 2.759 3.15 0 1.083-.268 1.936-.793 2.545zM18.25 10.5h1.5v7.2h-1.5zM20.5 10.5h3v3h-3zM18.25 18.5h1.5v3h-1.5zM20.5 14.5h3v7h-3z" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
