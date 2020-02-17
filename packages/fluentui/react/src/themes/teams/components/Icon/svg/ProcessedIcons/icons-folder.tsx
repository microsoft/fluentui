import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={classes.brownPath}
          d="M22.067 11.823h-6.786c-.043 0-.072-.012-.062 0l-1.358-1.361c-.209-.209-.644-.559-1.214-.559H9.693C8.648 9.903 8 10.867 8 11.76v8.64c0 1.014.68 1.697 1.693 1.697h12.454c.552 0 1.081-.232 1.416-.619.273-.314.398-.712.358-1.126V13.68c0-.971-.884-1.857-1.854-1.857z"
        />
        <path
          className={classes.otherBrownPath}
          d="M22.148 11.823H8.815A.816.816 0 0 0 8 12.64v7.76c0 1.014.68 1.697 1.693 1.697h12.454c.892 0 1.853-.649 1.853-1.697v-6.72c0-.971-.883-1.857-1.852-1.857z"
        />
      </g>
    </svg>
  ),
  styles: {
    brownPath: () => ({
      fill: '#ddaf52',
    }),
    otherBrownPath: () => ({
      fill: '#efd084',
    }),
  },
} as TeamsProcessedSvgIconSpec
