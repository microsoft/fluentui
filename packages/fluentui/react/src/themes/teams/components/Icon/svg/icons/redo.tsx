import * as React from 'react'
import cx from 'classnames'
import { TeamsProcessedSvgIconSpec } from '../types'
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
          d="M22.9615,12.6909c0.0505-0.1222,0.0505-0.2596,0-0.3818c-0.0255-0.0615-0.0623-0.1169-0.1086-0.1632l-2.9994-2.9994
          c-0.1953-0.1953-0.5117-0.1953-0.707,0s-0.1953,0.5117,0,0.707L21.293,12H14.5C14.4448,12,9,12.063,9,17.5
          c0,5.4375,5.4448,5.5,5.5,5.5c0.2764,0,0.5-0.2236,0.5-0.5S14.7764,22,14.5,22c-0.1836,0-4.5-0.0508-4.5-4.5
          c0-4.4297,4.3174-4.499,4.5-4.5h6.793l-2.1465,2.1465c-0.1953,0.1953-0.1953,0.5117,0,0.707C19.2441,15.9512,19.3721,16,19.5,16
          s0.2559-0.0488,0.3535-0.1465l2.9994-2.9994C22.8993,12.8079,22.9361,12.7524,22.9615,12.6909z"
        />
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M15,11h4.5859l-1.293-1.293c-0.3906-0.3906-0.3906-1.0234,0-1.4141s1.0234-0.3906,1.4141,0l3,3
          c0.3906,0.3906,0.3906,1.0234,0,1.4141l-3,3C19.5117,15.9023,19.2559,16,19,16s-0.5117-0.0977-0.707-0.293
          c-0.3906-0.3906-0.3906-1.0234,0-1.4141L19.5859,13H15c-0.1631,0-4,0.0454-4,4c0,3.8525,3.5947,3.9961,4,4c0.5522,0,1,0.4473,1,1
          s-0.4478,1-1,1c-2.0752,0-6-1.2539-6-6S12.9248,11,15,11z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
