import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ZoomOutIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M11 8C11.2761 8 11.5 8.22386 11.5 8.5C11.5 8.77614 11.2761 9 11 9H6C5.72386 9 5.5 8.77614 5.5 8.5C5.5 8.22386 5.72386 8 6 8H11Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 8.5C14 5.46243 11.5376 3 8.5 3C5.46243 3 3 5.46243 3 8.5C3 11.5376 5.46243 14 8.5 14C9.83879 14 11.0659 13.5217 12.0196 12.7266L16.1464 16.8536L16.2157 16.9114C16.4106 17.0464 16.68 17.0271 16.8536 16.8536C17.0488 16.6583 17.0488 16.3417 16.8536 16.1464L12.7266 12.0196C13.5217 11.0659 14 9.83879 14 8.5ZM4 8.5C4 6.01472 6.01472 4 8.5 4C10.9853 4 13 6.01472 13 8.5C13 10.9853 10.9853 13 8.5 13C6.01472 13 4 10.9853 4 8.5Z"
        />
      </g>
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 8.5C14 5.46243 11.5376 3 8.5 3C5.46243 3 3 5.46243 3 8.5C3 11.5376 5.46243 14 8.5 14C9.74832 14 10.8995 13.5841 11.8226 12.8834L15.9697 17.0303L16.0538 17.1029C16.3474 17.3208 16.7641 17.2966 17.0303 17.0303C17.3232 16.7374 17.3232 16.2626 17.0303 15.9697L12.8834 11.8226C13.5841 10.8995 14 9.74832 14 8.5ZM11 7.75C11.4142 7.75 11.75 8.08579 11.75 8.5C11.75 8.91421 11.4142 9.25 11 9.25H6C5.58579 9.25 5.25 8.91421 5.25 8.5C5.25 8.08579 5.58579 7.75 6 7.75H11Z"
      />
    </svg>
  ),
  displayName: 'ZoomOutIcon',
});
