import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path d="M11 11l-.8 4H8v1h3l.833-4h8.333L21 16h3v-1h-2.2l-.8-4zM11.648 21.648L16.29 17H13v-1h5v5h-1v-3.29l-4.648 4.642z" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
