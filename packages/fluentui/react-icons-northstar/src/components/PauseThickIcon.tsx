import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const PauseThickIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.5 2C3.67157 2 3 2.67157 3 3.5V16.5C3 17.3284 3.67157 18 4.5 18H6.5C7.32843 18 8 17.3284 8 16.5V3.5C8 2.67157 7.32843 2 6.5 2H4.5ZM4.5 3C4.22386 3 4 3.22386 4 3.5V16.5C4 16.7761 4.22386 17 4.5 17H6.5C6.77614 17 7 16.7761 7 16.5V3.5C7 3.22386 6.77614 3 6.5 3H4.5Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.5 2C12.6716 2 12 2.67157 12 3.5V16.5C12 17.3284 12.6716 18 13.5 18H15.5C16.3284 18 17 17.3284 17 16.5V3.5C17 2.67157 16.3284 2 15.5 2H13.5ZM13.5 3C13.2239 3 13 3.22386 13 3.5V16.5C13 16.7761 13.2239 17 13.5 17H15.5C15.7761 17 16 16.7761 16 16.5V3.5C16 3.22386 15.7761 3 15.5 3H13.5Z"
        />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M12 3.5C12 2.67157 12.6716 2 13.5 2H15.5C16.3284 2 17 2.67157 17 3.5V16.5C17 17.3284 16.3284 18 15.5 18H13.5C12.6716 18 12 17.3284 12 16.5V3.5Z" />
        <path d="M3 3.5C3 2.67157 3.67157 2 4.5 2H6.5C7.32843 2 8 2.67157 8 3.5V16.5C8 17.3284 7.32843 18 6.5 18H4.5C3.67157 18 3 17.3284 3 16.5V3.5Z" />
      </g>
    </svg>
  ),
  displayName: 'PauseThickIcon',
});
