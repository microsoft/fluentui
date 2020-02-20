import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="8 8 16 16">
      <path d="M10 22V10l8.5 6zm1-10.07v8.14L16.766 16zM21 10h1v12h-1V10z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
