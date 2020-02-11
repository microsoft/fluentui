import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path d="M12 11h8v1h-8zM12 13h6v1h-6zM12 19h7v1h-7z" />
        <path d="M21.5 8h-11c-.651 0-1.2.42-1.408 1H21.5a.5.5 0 0 1 .5.5V16H10v-2H9v7.5c0 .827.673 1.5 1.5 1.5h11c.827 0 1.5-.673 1.5-1.5v-12c0-.827-.673-1.5-1.5-1.5zm.5 13.5c0 .275-.225.5-.5.5h-11a.5.5 0 0 1-.5-.5V17h12v4.5z" />
        <circle cx="9.25" cy="11.5" r="1.25" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
