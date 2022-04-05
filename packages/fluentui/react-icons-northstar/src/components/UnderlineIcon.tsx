import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const UnderlineIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M6 3.5C6 3.22386 5.77614 3 5.5 3C5.22386 3 5 3.22386 5 3.5V9.95455C5 12.7363 7.23385 15 10 15C12.7661 15 15 12.7363 15 9.95455V3.5C15 3.22386 14.7761 3 14.5 3C14.2239 3 14 3.22386 14 3.5V9.95455C14 12.1935 12.2044 14 10 14C7.79559 14 6 12.1935 6 9.95455V3.5Z" />
        <path d="M5 16.5C5 16.2239 5.22386 16 5.5 16H14.5C14.7761 16 15 16.2239 15 16.5C15 16.7761 14.7761 17 14.5 17H5.5C5.22386 17 5 16.7761 5 16.5Z" />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M6.5 3.75C6.5 3.33579 6.16421 3 5.75 3C5.33579 3 5 3.33579 5 3.75V9C5 10.367 5.33884 11.7359 6.1606 12.7802C7.00313 13.8509 8.29163 14.5 10 14.5C11.7084 14.5 12.9969 13.8509 13.8394 12.7802C14.6612 11.7359 15 10.367 15 9V3.75C15 3.33579 14.6642 3 14.25 3C13.8358 3 13.5 3.33579 13.5 3.75V9C13.5 10.1434 13.2138 11.1495 12.6606 11.8526C12.1281 12.5293 11.2916 13 10 13C8.70837 13 7.87187 12.5293 7.3394 11.8526C6.78616 11.1495 6.5 10.1434 6.5 9V3.75Z" />
        <path d="M5.75 15.5C5.33579 15.5 5 15.8358 5 16.25C5 16.6642 5.33579 17 5.75 17H14.25C14.6642 17 15 16.6642 15 16.25C15 15.8358 14.6642 15.5 14.25 15.5H5.75Z" />
      </g>
    </svg>
  ),
  displayName: 'UnderlineIcon',
});
