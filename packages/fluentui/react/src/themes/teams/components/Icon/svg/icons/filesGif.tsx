import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path d="M20.5 8H15c-.4 0-.777.156-1.083.463l-3.478 3.968c-.283.283-.439.66-.439 1.06V22.5c0 .827.673 1.5 1.5 1.5h9c.827 0 1.5-.673 1.5-1.5v-13c0-.827-.673-1.5-1.5-1.5zm-6.514 1.9V13h-2.718l2.718-3.1zM21 22.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V14h3.986V9.003c.005 0 .01-.003.014-.003h5.5a.5.5 0 0 1 .5.5v13z" />
        <path d="M17.625 17.625v2.25h.75v-1.5h1v-.75h-1v-.75h1.5v-.75h-2.25zM16.125 16.125h.75v3.75h-.75zM12.625 17.762v.476a1.64 1.64 0 0 0 1.637 1.637h1.113v-2.25h-1.25v.75h.5v.75h-.363a.888.888 0 0 1-.887-.887v-.475c0-.49.398-.888.887-.888h1.113v-.75h-1.113a1.64 1.64 0 0 0-1.637 1.637z" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
