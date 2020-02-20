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
          d="M20.5 21c-.3 0-.5.2-.5.5v1c0 .3-.2.5-.5.5h-9c-.3 0-.5-.2-.5-.5V14h4V9h5.5c.3 0 .5.2.5.5v2c0 .3.2.5.5.5s.5-.2.5-.5v-2c0-.8-.7-1.5-1.5-1.5H14c-.4 0-.8.2-1.1.5l-3.5 4c-.2.2-.4.6-.4 1v9c0 .8.7 1.5 1.5 1.5h9c.8 0 1.5-.7 1.5-1.5v-1c0-.3-.2-.5-.5-.5zM13 9.9V13h-2.7L13 9.9zm10.5 6.8c.1-.1.1-.3 0-.4 0-.1-.1-.1-.1-.2l-2.5-2.5c-.2-.2-.5-.2-.7 0s-.2.5 0 .7l1.6 1.6h-7.3c-.3 0-.5.2-.5.5s.2.5.5.5h7.3l-1.6 1.6c-.2.2-.2.5 0 .7.1.1.2.1.4.1s.3 0 .4-.1l2.5-2.5c-.1.1-.1.1 0 0z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M24 16.5c0-.06-.01-.11-.02-.16v-.02c-.04-.22-.16-.42-.32-.57l-2.45-2.45a.996.996 0 1 0-1.41 1.41l.78.78H14.5c-.55 0-1 .45-1 1s.45 1 1 1h6.09l-.8.8a.996.996 0 0 0 .71 1.7c.26 0 .51-.1.71-.29l2.5-2.5c.19-.18.29-.44.29-.7zM20.5 21c-.28 0-.5.22-.5.5v1c0 .28-.22.5-.5.5h-9c-.28 0-.5-.22-.5-.5V14h3.99V9h5.51c.28 0 .5.22.5.5v2c0 .28.22.5.5.5s.5-.22.5-.5v-2c0-.83-.67-1.5-1.5-1.5H14c-.4 0-.78.16-1.08.46l-3.48 3.97c-.28.28-.44.66-.44 1.06v9.01c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-1c0-.28-.22-.5-.5-.5zM12.99 9.9V13h-2.72l2.72-3.1z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
