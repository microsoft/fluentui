import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const AttendeeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg className={classes.svg} viewBox="8 8 16 16" role="presentation" focusable="false">
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M11.5,18H8v2.92C8,22.5,9.7,23,11,23h.5a.51.51,0,0,0,.5-.5.49.49,0,0,0-.16-.38.72.72,0,0,0-.4-.12C10.7,22,9,22,9,20.92V19h2.5a.5.5,0,0,0,0-1ZM19,18H13v3.93C13,23.49,14.72,24,16,24s3-.48,3-2.07Zm-1,1v2.93c0,.91-1.32,1.07-2,1.07s-2-.16-2-1.07V19Zm6-1H20.5a.5.5,0,0,0,0,1H23v1.92C23,22,21.25,22,20.5,22a.5.5,0,0,0,0,1H21c1.3,0,3-.5,3-2.08ZM13,12a2,2,0,1,0-2-2A2,2,0,0,0,13,12Zm0-3a1,1,0,1,1-1,1A1,1,0,0,1,13,9Zm6,3a2,2,0,1,0-2-2A2,2,0,0,0,19,12Zm0-3a1,1,0,1,1-1,1A1,1,0,0,1,19,9Zm-3,8a2,2,0,1,0-2-2A2,2,0,0,0,16,17Zm0-3a1,1,0,1,1-1,1A1,1,0,0,1,16,14Zm-6,3a2,2,0,1,0-2-2A2,2,0,0,0,10,17Zm0-3a1,1,0,1,1-1,1A1,1,0,0,1,10,14Zm12,3a2,2,0,1,0-2-2A2,2,0,0,0,22,17Zm0-3a1,1,0,1,1-1,1A1,1,0,0,1,22,14Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M8,18v2.92C8,22.5,9.7,23,11,23h.5a.51.51,0,0,0,.5-.5V18Zm11,0H13v3.93C13,23.49,14.72,24,16,24s3-.48,3-2.07Zm5,0H20v5h1c1.3,0,3-.5,3-2.08ZM13,12a2,2,0,1,0-2-2A2,2,0,0,0,13,12Zm6,0a2,2,0,1,0-2-2A2,2,0,0,0,19,12Zm-3,5a2,2,0,1,0-2-2A2,2,0,0,0,16,17Zm-6,0a2,2,0,1,0-2-2A2,2,0,0,0,10,17Zm12,0a2,2,0,1,0-2-2A2,2,0,0,0,22,17Z"
      />
    </svg>
  ),
  displayName: 'AttendeeIcon',
});
