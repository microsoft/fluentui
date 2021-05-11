import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ChevronDownIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M15.8527 7.64582C16.0484 7.84073 16.0489 8.15731 15.854 8.35292L10.389 13.8374C10.1741 14.0531 9.82477 14.0531 9.60982 13.8374L4.14484 8.35292C3.94993 8.15731 3.95049 7.84073 4.1461 7.64582C4.34171 7.4509 4.65829 7.45147 4.85321 7.64708L9.99942 12.8117L15.1456 7.64708C15.3406 7.45147 15.6571 7.4509 15.8527 7.64582Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M15.793 7.73271C16.0787 8.03263 16.0672 8.50737 15.7672 8.79306L10.5168 13.7944C10.2271 14.0703 9.77187 14.0703 9.4822 13.7944L4.23173 8.79306C3.93181 8.50737 3.92028 8.03263 4.20597 7.73271C4.49166 7.43279 4.96639 7.42125 5.26631 7.70694L9.99949 12.2155L14.7327 7.70694C15.0326 7.42125 15.5073 7.43279 15.793 7.73271Z"
      />
    </svg>
  ),
  displayName: 'ChevronDownIcon',
});
