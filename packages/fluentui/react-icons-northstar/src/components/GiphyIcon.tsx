import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const GiphyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg viewBox="8 8 16 16" role="presentation" focusable="false" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M14.5 19h-1.74a1.967 1.967 0 0 1-1.966-1.967v-1.858c0-1.201.974-2.175 2.175-2.175H14.5v1h-1.527c-.651 0-1.18.528-1.18 1.179v1.854c0 .535.434.967.969.967h.738v-1.5H13v-1h1.5V19zM16.003 13H17v6h-.997zM21.347 14v-1H18.5v6h1.003v-2.518H21v-1h-1.497V14z" />
        <path d="M16 24c-2.09 0-4.123-.21-6.043-.628A2.511 2.511 0 0 1 8 20.926v-9.852c0-1.171.823-2.2 1.957-2.447 3.842-.833 8.244-.833 12.086 0A2.51 2.51 0 0 1 24 11.074v9.852c0 1.17-.823 2.199-1.957 2.446C20.123 23.79 18.09 24 16 24zm0-15c-2.018 0-3.98.204-5.83.606A1.503 1.503 0 0 0 9 11.074v9.852c0 .703.492 1.32 1.17 1.468 3.7.804 7.96.804 11.66 0A1.504 1.504 0 0 0 23 20.926v-9.852c0-.704-.492-1.321-1.17-1.468A27.541 27.541 0 0 0 16 9z" />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M22.043 8.627c-3.842-.833-8.244-.833-12.086 0A2.51 2.51 0 0 0 8 11.074v9.852c0 1.17.823 2.199 1.957 2.446C11.877 23.79 13.91 24 16 24s4.123-.21 6.043-.628A2.511 2.511 0 0 0 24 20.926v-9.852c0-1.171-.823-2.2-1.957-2.447zM14.5 14h-1.527c-.651 0-1.179.528-1.179 1.179v1.854c0 .535.433.967.968.967h.738v-1.5H13v-1h1.5V19h-1.74a1.967 1.967 0 0 1-1.966-1.967v-1.858c0-1.201.974-2.175 2.175-2.175H14.5v1zm2.5 5h-.997v-6H17v6zm4.347-5h-1.844v1.482H21v1h-1.497V19H18.5v-6h2.847v1z" />
      </g>
    </svg>
  ),
  displayName: 'GiphyIcon',
});
