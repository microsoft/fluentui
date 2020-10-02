import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const MoreIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" viewBox="0 0 20 20" className={classes.svg}>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M6.5 10C6.5 10.9665 5.7165 11.75 4.75 11.75C3.7835 11.75 3 10.9665 3 10C3 9.0335 3.7835 8.25 4.75 8.25C5.7165 8.25 6.5 9.0335 6.5 10Z" />
        <path d="M17 10C17 10.9665 16.2165 11.75 15.25 11.75C14.2835 11.75 13.5 10.9665 13.5 10C13.5 9.0335 14.2835 8.25 15.25 8.25C16.2165 8.25 17 9.0335 17 10Z" />
        <path d="M10 11.75C10.9665 11.75 11.75 10.9665 11.75 10C11.75 9.0335 10.9665 8.25 10 8.25C9.0335 8.25 8.25 9.0335 8.25 10C8.25 10.9665 9.0335 11.75 10 11.75Z" />
      </g>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M6 10C6 10.6904 5.44036 11.25 4.75 11.25C4.05964 11.25 3.5 10.6904 3.5 10C3.5 9.30964 4.05964 8.75 4.75 8.75C5.44036 8.75 6 9.30964 6 10Z" />
        <path d="M11.25 10C11.25 10.6904 10.6904 11.25 10 11.25C9.30964 11.25 8.75 10.6904 8.75 10C8.75 9.30964 9.30964 8.75 10 8.75C10.6904 8.75 11.25 9.30964 11.25 10Z" />
        <path d="M15.25 11.25C15.9404 11.25 16.5 10.6904 16.5 10C16.5 9.30964 15.9404 8.75 15.25 8.75C14.5596 8.75 14 9.30964 14 10C14 10.6904 14.5596 11.25 15.25 11.25Z" />
      </g>
    </svg>
  ),
  displayName: 'MoreIcon',
});
