import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M19.6 15.5H19c-.4-1.2-1.5-2-2.8-2h-1.5c-2.3 0-4.3 1.2-5.5 3H9c-.3 0-.6.2-.7.5h.5c-.3.6-.6 1.3-.7 2h1.5c0 1 .8 1.9 1.9 1.9s1.9-.8 1.9-1.9h5.3c0 1 .8 1.9 1.9 1.9s1.9-.8 1.9-1.9H24c-.5-2-2.3-3.5-4.4-3.5zm-8 4.6c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1zm9 0c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1zm1.6-2.1c-.3-.5-.9-.9-1.6-.9-.7 0-1.3.4-1.6.9h-5.8c-.3-.5-.9-.9-1.6-.9s-1.3.4-1.6.9h-.5c.8-2 2.8-3.5 5.1-3.5h1.5c1.1 0 2 .9 2 2h1.5c1.2 0 2.2.6 2.9 1.5h-.3z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
