import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ItalicIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M16 3C16.2761 3 16.5 3.22386 16.5 3.5C16.5 3.77614 16.2761 4 16 4H12.843L8.227 16H11.5C11.7761 16 12 16.2239 12 16.5C12 16.7761 11.7761 17 11.5 17H4C3.72386 17 3.5 16.7761 3.5 16.5C3.5 16.2239 3.72386 16 4 16H7.156L11.771 4H8.5C8.22386 4 8 3.77614 8 3.5C8 3.22386 8.22386 3 8.5 3H16Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M8 3.25C8 2.83579 8.33579 2.5 8.75 2.5H16.25C16.6642 2.5 17 2.83579 17 3.25C17 3.66421 16.6642 4 16.25 4H13.0151L8.59202 15.5H11.25C11.6642 15.5 12 15.8358 12 16.25C12 16.6642 11.6642 17 11.25 17H3.75C3.33579 17 3 16.6642 3 16.25C3 15.8358 3.33579 15.5 3.75 15.5H6.9849L11.408 4H8.75C8.33579 4 8 3.66421 8 3.25Z"
      />
    </svg>
  ),
  displayName: 'ItalicIcon',
});
