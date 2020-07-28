import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const LockIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M20.5 14H20v-2c0-2.206-1.794-4-4-4s-4 1.794-4 4v2h-.5c-.827 0-1.5.673-1.5 1.5v6.576c0 .665.439 1.256 1.067 1.438.775.221 2.26.486 4.933.486 2.675 0 4.16-.265 4.934-.486A1.496 1.496 0 0 0 22 22.076V15.5c0-.827-.673-1.5-1.5-1.5zM13 12c0-1.654 1.346-3 3-3s3 1.346 3 3v2h-6v-2zm8 10.076a.492.492 0 0 1-.343.477C19.945 22.757 18.56 23 16 23c-2.558 0-3.945-.243-4.657-.447a.49.49 0 0 1-.343-.477V15.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v6.576z" />
    </svg>
  ),
  displayName: 'LockIcon',
});
