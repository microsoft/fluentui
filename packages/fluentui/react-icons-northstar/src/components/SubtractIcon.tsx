import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const SubtractIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <rect className={cx(iconClassNames.outline, classes.outlinePart)} x="3" y="9.5" width="14" height="1" rx="0.5" />
      <rect
        className={cx(iconClassNames.filled, classes.filledPart)}
        x="3"
        y="9.25"
        width="14"
        height="1.5"
        rx="0.75"
      />
    </svg>
  ),
  displayName: 'SubtractIcon',
});
