import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const CloseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(iconClassNames.outline, classes.outlinePart)}
          d="M16.707 16l4.243-4.243a.5.5 0 1 0-.707-.707L16 15.293l-4.243-4.243a.5.5 0 1 0-.707.707L15.293 16l-4.243 4.243a.5.5 0 1 0 .707.707L16 16.707l4.243 4.243a.498.498 0 0 0 .707 0 .5.5 0 0 0 0-.707L16.707 16z"
        />
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M17.414 16l3.89-3.89a1 1 0 1 0-1.415-1.413L16 14.586l-3.89-3.89a1 1 0 1 0-1.413 1.415L14.586 16l-3.89 3.89a1 1 0 1 0 1.415 1.413L16 17.414l3.89 3.89a.997.997 0 0 0 1.413 0 1 1 0 0 0 0-1.415L17.414 16z"
        />
      </g>
    </svg>
  ),
  displayName: 'CloseIcon',
});
