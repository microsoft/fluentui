import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const NoPresenterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <circle cx="16" cy="10" r="2" />
        <path d="M13,14.5V13h3l-1,1H14v.5a.5.5,0,0,1-.5.5A.51.51,0,0,1,13,14.5Z" />
        <path d="M9.5,16.5A.5.5,0,0,1,10,16h3l-2,2V17H10A.5.5,0,0,1,9.5,16.5Z" />
        <path d="M18.5,15a.5.5,0,0,0,.5-.5v-.8l4.85-4.85A.5.5,0,0,0,23.5,8a.49.49,0,0,0-.36.15l-15,15A.5.5,0,0,0,8.5,24a.49.49,0,0,0,.36-.15l.91-.91A.46.46,0,0,0,10,23H22a.5.5,0,0,0,0-1H21V17h1a.5.5,0,0,0,0-1H16.71L18,14.67A.52.52,0,0,0,18.5,15Z" />
      </g>

      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M16,12a2,2,0,1,0-2-2A2,2,0,0,0,16,12Zm0-3a1,1,0,1,1-1,1A1,1,0,0,1,16,9Zm-3,5.5V13h3l-1,1H14v.5a.5.5,0,0,1-.5.5A.51.51,0,0,1,13,14.5Zm-3.5,2A.5.5,0,0,1,10,16h3l-2,2V17H10A.5.5,0,0,1,9.5,16.5Zm9-1.5a.5.5,0,0,0,.5-.5v-.8l4.85-4.85A.5.5,0,0,0,23.5,8a.49.49,0,0,0-.36.15l-15,15A.5.5,0,0,0,8.5,24a.49.49,0,0,0,.36-.15l.91-.91A.46.46,0,0,0,10,23H22a.5.5,0,0,0,0-1H21V17h1a.5.5,0,0,0,0-1H16.71L18,14.67A.52.52,0,0,0,18.5,15ZM20,17v5H12V20.7L15.71,17Z" />
      </g>
    </svg>
  ),
  displayName: 'NoPresenterIcon',
});
