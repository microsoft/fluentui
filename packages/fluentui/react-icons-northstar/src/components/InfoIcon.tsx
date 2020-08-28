import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const InfoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(iconClassNames.outline, classes.outlinePart)}
          d="M16.5 9C12.4 9 9 12.4 9 16.5s3.4 7.5 7.5 7.5 7.5-3.4 7.5-7.5S20.6 9 16.5 9zm0 14c-3.6 0-6.5-2.9-6.5-6.5s2.9-6.5 6.5-6.5 6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5zm0-7.5c-.3 0-.5.2-.5.5v3.5c0 .3.2.5.5.5s.5-.2.5-.5V16c0-.3-.2-.5-.5-.5z"
        />
        <circle className={cx(iconClassNames.outline, classes.outlinePart)} cx="16.5" cy="13.5" r="1" />
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M16.5 9C12.4 9 9 12.4 9 16.5s3.4 7.5 7.5 7.5 7.5-3.4 7.5-7.5S20.6 9 16.5 9zm.5 10.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V16c0-.3.2-.5.5-.5s.5.2.5.5v3.5zm-.5-5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"
        />
      </g>
    </svg>
  ),
  displayName: 'InfoIcon',
});
