import * as React from 'react'
import cx from 'classnames'
import { TeamsSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg
      role="presentation"
      focusable="false"
      viewBox="8 8 16 16"
      className={classes.svgFlippingInRtl}
    >
      <g>
        <path
          className={cx(teamsIconClassNames.outline, classes.outlinePart)}
          d="M23 15.6L9.4 10.1c-.3-.2-.7-.1-1 .1-.3.2-.4.6-.3 1l1.2 5.3L8 21.8c-.1.4 0 .7.3 1 .3.1.5.2.7.2.1 0 .3 0 .4-.1L23 17.4c.4-.2.6-.5.6-.9s-.2-.7-.6-.9zM9 11l12.3 5H10.2L9 11zm0 11l1.2-5h11.2L9 22z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M23.207 15.093a.487.487 0 0 0-.019-.009L9.636 9.477a.991.991 0 0 0-1.051.13.994.994 0 0 0-.345 1.002l1.129 4.89h10.13v1H9.37l-1.13 4.892a1.005 1.005 0 0 0 .977 1.228c.138 0 .274-.03.4-.088l13.592-5.624a.99.99 0 0 0 .579-.907.991.991 0 0 0-.58-.907z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsSvgIconSpec
