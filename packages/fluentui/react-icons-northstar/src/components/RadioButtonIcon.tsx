// This is Fluent-style icon
import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const RadioButtonIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M8,1A7,7,0,1,1,1,8,7.008,7.008,0,0,1,8,1M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0Z"
      />
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M8,1A7,7,0,1,1,1,8,7.008,7.008,0,0,1,8,1M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0Z" />
        <circle cx="8" cy="8" r="5" />
      </g>
    </svg>
  ),
  displayName: 'RadioButtonIcon',
});
