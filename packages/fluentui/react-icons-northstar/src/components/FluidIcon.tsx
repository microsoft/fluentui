import * as React from 'react';
import cx from 'classnames';
import createSvgIcon from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

const FluidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M22,16H18a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2V18A2,2,0,0,0,22,16Zm1,6a1,1,0,0,1-1,1H18a1,1,0,0,1-1-1V18a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1Z" />
        <path d="M21,12v3h1V12a2,2,0,0,0-2-2H14v1h6A1,1,0,0,1,21,12Z" />
        <path d="M11,20V14H10v6a2,2,0,0,0,2,2h3V21H12A1,1,0,0,1,11,20Z" />
        <path d="M13,11.5v-2A1.5,1.5,0,0,0,11.5,8h-2A1.5,1.5,0,0,0,8,9.5v2A1.5,1.5,0,0,0,9.5,13h2A1.5,1.5,0,0,0,13,11.5Zm-4,0v-2A.5.5,0,0,1,9.5,9h2a.5.5,0,0,1,.5.5v2a.5.5,0,0,1-.5.5h-2A.5.5,0,0,1,9,11.5Z" />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <rect x="16" y="16" width="8" height="8" rx="2" />
        <path d="M21,12v3h1V12a2,2,0,0,0-2-2H14v1h6A1,1,0,0,1,21,12Z" />
        <path d="M11,20V14H10v6a2,2,0,0,0,2,2h3V21H12A1,1,0,0,1,11,20Z" />
        <path d="M13,11.5v-2A1.5,1.5,0,0,0,11.5,8h-2A1.5,1.5,0,0,0,8,9.5v2A1.5,1.5,0,0,0,9.5,13h2A1.5,1.5,0,0,0,13,11.5Zm-4,0v-2A.5.5,0,0,1,9.5,9h2a.5.5,0,0,1,.5.5v2a.5.5,0,0,1-.5.5h-2A.5.5,0,0,1,9,11.5Z" />
      </g>
    </svg>
  ),
  displayName: 'FluidIcon',
});

export default FluidIcon;
