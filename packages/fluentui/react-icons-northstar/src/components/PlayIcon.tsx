import cx from 'classnames';
import * as React from 'react';
import { iconClassNames } from '../utils/iconClassNames';
import { createSvgIcon } from '../utils/createSvgIcon';

export const PlayIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="2 2 16 16">
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M17.2204 8.68703C18.2558 9.25661 18.2558 10.7434 17.2204 11.313L7.2234 16.812C6.22371 17.362 5 16.6393 5 15.4991L5 4.50093C5 3.36068 6.22371 2.63805 7.2234 3.18795L17.2204 8.68703ZM16.7381 10.4377C17.0833 10.2478 17.0833 9.7522 16.7381 9.56234L6.74113 4.06327C6.4079 3.87997 6 4.12084 6 4.50093L6 15.4991C6 15.8792 6.4079 16.12 6.74114 15.9367L16.7381 10.4377Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M17.2221 8.68458C18.2586 9.25438 18.2586 10.7437 17.2221 11.3135L7.22259 16.8105C6.22292 17.36 5 16.6367 5 15.496L5 4.50214C5 3.36137 6.22292 2.63812 7.22259 3.18766L17.2221 8.68458Z"
      />
    </svg>
  ),
  displayName: 'PlayIcon',
});
