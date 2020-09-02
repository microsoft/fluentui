import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const MenuIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M22.49 10.47c0 .14-.05.25-.14.35s-.21.14-.35.14H9c-.14 0-.25-.05-.35-.14s-.14-.21-.14-.35.05-.25.14-.35.21-.14.35-.14h13c.14 0 .25.05.35.14s.14.21.14.35zm0 5c0 .14-.05.25-.14.35s-.21.14-.35.14H9c-.14 0-.25-.05-.35-.14s-.14-.21-.14-.35.05-.25.14-.35.21-.14.35-.14h13c.14 0 .25.05.35.14s.14.21.14.35zm0 5c0 .14-.05.25-.14.35s-.21.14-.35.14H9c-.14 0-.25-.05-.35-.14s-.14-.21-.14-.35.05-.25.14-.35.21-.14.35-.14h13c.14 0 .25.05.35.14s.14.21.14.35z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M9 11h13c.6 0 1-.4 1-1s-.4-1-1-1H9c-.6 0-1 .4-1 1s.4 1 1 1zm13 8H9c-.6 0-1 .4-1 1s.4 1 1 1h13c.6 0 1-.4 1-1s-.4-1-1-1zm0-5H9c-.6 0-1 .4-1 1s.4 1 1 1h13c.6 0 1-.4 1-1s-.4-1-1-1z"
      />
    </svg>
  ),
  displayName: 'MenuIcon',
});
