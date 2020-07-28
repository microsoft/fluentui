import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const PresenterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M21,22V17h1a.5.5,0,0,0,0-1H10a.5.5,0,0,0,0,1h1v5H10a.5.5,0,0,0,0,1H22a.5.5,0,0,0,0-1Z" />
        <path d="M16,8a2,2,0,1,0,2,2,2,2,0,0,0-2-2Z" />
        <path d="M19,13v1.5a.5.5,0,0,1-.5.5.51.51,0,0,1-.5-.5V14H14v.5a.5.5,0,0,1-.5.5.51.51,0,0,1-.5-.5V13Z" />
      </g>

      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M21,22V17h1a.5.5,0,0,0,0-1H10a.5.5,0,0,0,0,1h1v5H10a.5.5,0,0,0,0,1H22a.5.5,0,0,0,0-1Zm-9-5h8v5H12Zm4-8a1,1,0,1,1-1,1,1,1,0,0,1,1-1m0-1a2,2,0,1,0,2,2,2,2,0,0,0-2-2Zm3,5v1.5a.5.5,0,0,1-.5.5.51.51,0,0,1-.5-.5V14H14v.5a.5.5,0,0,1-.5.5.51.51,0,0,1-.5-.5V13Z" />
      </g>
    </svg>
  ),
  displayName: 'PresenterIcon',
});
