import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ToggleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 18 16" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M19,18a2,2,0,1,0-2-2A2,2,0,0,0,19,18Z" />
        <path d="M9,16a4,4,0,0,1,4-4h6a4,4,0,0,1,0,8H13A4,4,0,0,1,9,16Zm4-3a3,3,0,0,0,0,6h6a3,3,0,0,0,0-6Z" />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M13,12a4,4,0,0,0,0,8h6a4,4,0,0,0,0-8Zm6,6a2,2,0,1,1,2-2A2,2,0,0,1,19,18Z" />
      </g>
    </svg>
  ),
  displayName: 'ToggleIcon',
});
