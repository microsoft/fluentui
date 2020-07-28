import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const RetryIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M20.95 11.05a6.964 6.964 0 0 0-6.565-1.863.5.5 0 0 0 .23.974 5.963 5.963 0 0 1 5.628 1.596c2.339 2.34 2.339 6.146 0 8.486s-6.146 2.34-8.486 0a6.007 6.007 0 0 1 0-8.486c.079-.078.16-.152.243-.226V13.5a.5.5 0 1 0 1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 1 0 0 1h1.604l-.054.05a7.008 7.008 0 0 0 0 9.9c1.365 1.364 3.157 2.047 4.95 2.047s3.585-.682 4.95-2.047a7.007 7.007 0 0 0 0-9.9z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M21.303 10.697A7.45 7.45 0 0 0 16 8.5a1 1 0 0 0 0 2c1.47 0 2.85.572 3.89 1.61 2.144 2.145 2.144 5.635 0 7.78s-5.635 2.144-7.78 0a5.507 5.507 0 0 1-.36-7.38V14a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75H9a.75.75 0 0 0 0 1.5h1.197c-2.413 2.943-2.247 7.307.5 10.053C12.113 22.72 13.997 23.5 16 23.5s3.887-.78 5.303-2.197c2.924-2.924 2.924-7.682 0-10.606z"
      />
    </svg>
  ),
  displayName: 'RetryIcon',
});
