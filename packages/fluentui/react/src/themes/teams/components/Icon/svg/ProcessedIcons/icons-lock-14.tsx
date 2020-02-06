import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M21.25 15.036v7.875h-10.5v-7.875h1.75V12.48a3.62 3.62 0 0 1 .267-1.387 3.55 3.55 0 0 1 .738-1.135 3.495 3.495 0 0 1 1.11-.766 3.56 3.56 0 0 1 2.77 0 3.498 3.498 0 0 1 1.11.766 3.55 3.55 0 0 1 .738 1.135 3.62 3.62 0 0 1 .267 1.387v2.557zm-.875.875h-8.75v6.125h8.75zm-7-.875h5.25V12.48a2.748 2.748 0 0 0-.198-1.042 2.698 2.698 0 0 0-.55-.858 2.604 2.604 0 0 0-3.753 0 2.7 2.7 0 0 0-.55.858 2.739 2.739 0 0 0-.199 1.042z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
