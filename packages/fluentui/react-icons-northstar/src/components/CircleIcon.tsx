import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const CircleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path d="M16,8c-4.418,0-8,3.582-8,8s3.582,8,8,8s8-3.582,8-8S20.418,8,16,8z M16,22.85c-3.783,0-6.85-3.067-6.85-6.85S12.217,9.15,16,9.15s6.85,3.067,6.85,6.85S19.783,22.85,16,22.85z" />
        <circle className={cx(iconClassNames.filled, classes.filledPart)} cx="16" cy="16" r="8" />
      </g>
    </svg>
  ),
  displayName: 'CircleIcon',
});
