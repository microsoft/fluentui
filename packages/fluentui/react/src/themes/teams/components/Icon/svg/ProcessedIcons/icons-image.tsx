import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M22.5 10h-13A1.502 1.502 0 0 0 8 11.5v9A1.502 1.502 0 0 0 9.5 22h13a1.502 1.502 0 0 0 1.5-1.5v-9a1.502 1.502 0 0 0-1.5-1.5zM9 20.5v-1.415l3.519-3.897a.498.498 0 0 1 .395-.145.489.489 0 0 1 .36.2L17.21 21H9.5a.5.5 0 0 1-.5-.5zm14 0a.5.5 0 0 1-.5.5h-4.078l-4.329-6.33a1.5 1.5 0 0 0-2.299-.17L9 17.593V11.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5zm-3.5-8a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1.001 1.001 0 0 1-1 1z" />
    </svg>
  ),
  styles: {},
  exportedAs: 'files-image',
} as TeamsProcessedSvgIconSpec
