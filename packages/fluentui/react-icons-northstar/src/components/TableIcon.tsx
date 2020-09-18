import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const TableIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M23,8a1,1,0,0,1,1,1V23a1,1,0,0,1-1,1H9a1,1,0,0,1-1-1V9A1,1,0,0,1,9,8ZM9,19v4h4V19Zm5,0v4h4V19ZM9,14v4h4V14Zm5,0v4h4V14ZM9,9v4h4V9ZM19,19v4h4V19ZM14,9v4h4V9Zm5,5v4h4V14Zm0-5v4h4V9Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M23,8a1,1,0,0,1,1,1v4H19V8ZM13,24H9a1,1,0,0,1-1-1V19h5Zm5,0H14V19h4Zm-5-6H8V14h5Zm5,0H14V14h4Zm6,5a1,1,0,0,1-1,1H19V19h5ZM13,13H8V9A1,1,0,0,1,9,8h4Zm5,0H14V8h4Zm6,5H19V14h5Z"
      />
    </svg>
  ),
  displayName: 'TableIcon',
});
