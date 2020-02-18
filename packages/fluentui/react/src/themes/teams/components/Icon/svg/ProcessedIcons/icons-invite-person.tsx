import * as React from 'react'
import cx from 'classnames'
import { TeamsProcessedSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(teamsIconClassNames.outline, classes.outlinePart)}
          d="M13.5 20.934C8.584 20.522 8 18.099 8 17v-1a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v.5H9v.5c0 1.666 1.59 2.683 4.5 2.934v1zM24 18.5v4.508a.5.5 0 0 1-.28.448c-.113.056-1.19.544-4.22.544-3.029 0-4.108-.488-4.22-.544a.5.5 0 0 1-.28-.448V18.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5zm-8 .5v.477l3.5 1.794 3.5-1.794V19h-7zm7 3.651v-2.33l-3.33 1.706a.377.377 0 0 1-.34 0L16 20.321v2.331c.46.13 1.53.348 3.5.348 1.967 0 3.036-.218 3.5-.349zM18 11c0-1.654-1.346-3-3-3s-3 1.346-3 3 1.346 3 3 3 3-1.346 3-3zm-1 0c0 1.103-.897 2-2 2s-2-.897-2-2 .897-2 2-2 2 .897 2 2z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M14 20.972C8.614 20.69 8 18.136 8 17v-1a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1h-6.5a1.5 1.5 0 0 0-1.5 1.5v2.472zm5.5.3l4.5-2.307V18.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v.465l4.5 2.306zm.17.755a.377.377 0 0 1-.34 0L15 19.807v3.2a.5.5 0 0 0 .28.45c.112.055 1.191.543 4.22.543 3.03 0 4.107-.488 4.22-.544a.5.5 0 0 0 .28-.448v-3.2l-4.33 2.22zM15 8c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
