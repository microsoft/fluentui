import cx from 'classnames';
import * as React from 'react';
import { iconClassNames } from '../utils/iconClassNames';
import { createSvgIcon } from '../utils/createSvgIcon';

export const PlayIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" className={classes.svg} viewBox="0 0 20 20">
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.2204 8.68703C17.2558 9.25661 17.2558 10.7434 16.2204 11.313L6.2234 16.812C5.22371 17.362 4 16.6393 4 15.4991L4 4.50093C4 3.36068 5.22371 2.63805 6.2234 3.18795L16.2204 8.68703ZM15.7381 10.4377C16.0833 10.2478 16.0833 9.7522 15.7381 9.56234L5.74113 4.06327C5.4079 3.87997 5 4.12084 5 4.50093L5 15.4991C5 15.8792 5.4079 16.12 5.74114 15.9367L15.7381 10.4377Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M16.2221 8.68458C17.2586 9.25438 17.2586 10.7437 16.2221 11.3135L6.22259 16.8105C5.22292 17.36 4 16.6367 4 15.496L4 4.50214C4 3.36137 5.22292 2.63812 6.22259 3.18766L16.2221 8.68458Z"
      />
    </svg>
  ),
  displayName: 'PlayIcon',
});
