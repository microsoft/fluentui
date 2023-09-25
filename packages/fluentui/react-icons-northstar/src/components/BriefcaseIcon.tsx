import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const BriefcaseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M7.5 3C7.22386 3 7 3.22386 7 3.5V6H5.5C4.11929 6 3 7.11929 3 8.5V13.5C3 14.8807 4.11929 16 5.5 16H14.5C15.8807 16 17 14.8807 17 13.5V8.5C17 7.11929 15.8807 6 14.5 6H13V3.5C13 3.22386 12.7761 3 12.5 3H7.5ZM12 6H8V4H12V6ZM5.5 7H14.5C15.3284 7 16 7.67157 16 8.5V13.5C16 14.3284 15.3284 15 14.5 15H5.5C4.67157 15 4 14.3284 4 13.5V8.5C4 7.67157 4.67157 7 5.5 7Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M7 3.5C7 3.22386 7.22386 3 7.5 3H12.5C12.7761 3 13 3.22386 13 3.5V6H14.5C15.8807 6 17 7.11929 17 8.5V13.5C17 14.8807 15.8807 16 14.5 16H5.5C4.11929 16 3 14.8807 3 13.5V8.5C3 7.11929 4.11929 6 5.5 6H7V3.5ZM12 6V4H8V6H12Z"
      />
    </svg>
  ),
  displayName: 'BriefcaseIcon',
});
