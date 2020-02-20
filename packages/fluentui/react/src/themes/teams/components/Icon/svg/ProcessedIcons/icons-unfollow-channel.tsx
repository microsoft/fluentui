import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path d="M12 11h8v1h-8zM12 13h6v1h-6zM12 19h7v1h-7z" />
        <path d="M10 21.5V17h12v2l1-1V9.5c0-.827-.673-1.5-1.5-1.5h-11c-.651 0-1.2.42-1.408 1H21.5a.5.5 0 0 1 .5.5V16H10v-2H9v7.5c0 .827.673 1.5 1.5 1.5H19v-1h-8.5a.5.5 0 0 1-.5-.5z" />
        <circle cx="9.25" cy="11.5" r="1.25" />
        <path d="M22.707 21.5l1.147-1.146a.5.5 0 1 0-.708-.708L22 20.793l-1.146-1.147a.5.5 0 1 0-.708.708l1.147 1.146-1.147 1.146a.5.5 0 1 0 .708.708L22 22.207l1.146 1.147a.498.498 0 0 0 .708 0 .5.5 0 0 0 0-.708L22.707 21.5z" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
