import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const SearchIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M23.352,22.648l-4.714-4.713A5.711,5.711,0,0,0,20,14.25,5.75,5.75,0,1,0,14.25,20a5.711,5.711,0,0,0,3.685-1.362l4.713,4.714a.5.5,0,1,0,.7-.7ZM9.5,14.25A4.75,4.75,0,1,1,14.25,19,4.8,4.8,0,0,1,9.5,14.25Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M14.25,8a6.236,6.236,0,0,1,5.062,9.9l4.4,4.391A.974.974,0,0,1,24,23a1.029,1.029,0,0,1-1,1,.982.982,0,0,1-.711-.3L17.9,19.312A6.246,6.246,0,1,1,14.25,8Zm0,2a4.25,4.25,0,1,0,4.25,4.25A4.285,4.285,0,0,0,14.25,10Z"
      />
    </svg>
  ),
  displayName: 'SearchIcon',
});
