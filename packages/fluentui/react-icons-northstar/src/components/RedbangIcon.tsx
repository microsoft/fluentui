import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const RedbangIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <g className={cx(iconClassNames.outline, classes.outlinePart)}>
          <circle cx="16" cy="21.5" r="1" />
          <path d="M17.98 11.267l-.99 6.88a.999.999 0 0 1-1.131.843.998.998 0 0 1-.849-.843l-.99-6.88c-.156-1.086.604-2.092 1.697-2.247s2.107.6 2.263 1.685c.028.188.025.383 0 .562z" />
        </g>
        <g className={cx(iconClassNames.filled, classes.filledPart)}>
          <circle cx="16" cy="21.5" r="1.5" />
          <path d="M18.467 11.425l-1.142 6.945a1.344 1.344 0 0 1-1.543 1.112 1.35 1.35 0 0 1-1.106-1.112l-1.115-6.78c-.216-1.312.525-2.678 1.813-3.01 1.44-.37 2.856.581 3.093 2.024.046.276.042.56 0 .82z" />
        </g>
      </g>
    </svg>
  ),
  displayName: 'RedbangIcon',
});
