import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const BulletsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svgFlippingInRtl}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M3 6.5a1 1 0 100-2 1 1 0 000 2zM6 5.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zM6 9.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zM6.5 13a.5.5 0 000 1h11a.5.5 0 000-1h-11zM4 13.5a1 1 0 11-2 0 1 1 0 012 0zM3 10.5a1 1 0 100-2 1 1 0 000 2z" />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M3.25 6.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zM7 5.25a.75.75 0 01.75-.75h9.5a.75.75 0 010 1.5h-9.5A.75.75 0 017 5.25zM7.75 9a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5zM7.75 13.5a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5zM4.5 9.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM3.25 15.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" />
      </g>
    </svg>
  ),
  displayName: 'BulletsIcon',
});
