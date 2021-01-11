import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const FlagIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(iconClassNames.outline, classes.outlinePart)}
          d="M4.5 13H15.5C15.8993 13 16.1375 12.5549 15.916 12.2226L13.1009 8L15.916 3.77735C16.1375 3.44507 15.8993 3 15.5 3H4C3.72386 3 3.5 3.22386 3.5 3.5V17.5C3.5 17.7761 3.72386 18 4 18C4.27614 18 4.5 17.7761 4.5 17.5V13ZM4.5 12V4H14.5657L12.084 7.72265C11.972 7.8906 11.972 8.1094 12.084 8.27735L14.5657 12H4.5Z"
        />
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M4.5 13H15.5C15.8993 13 16.1375 12.5549 15.916 12.2226L13.1009 8L15.916 3.77735C16.1375 3.44507 15.8993 3 15.5 3H4C3.72386 3 3.5 3.22386 3.5 3.5V17.5C3.5 17.7761 3.72386 18 4 18C4.27614 18 4.5 17.7761 4.5 17.5V13Z"
        />
      </g>
    </svg>
  ),
  displayName: 'FlagIcon',
});
