import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const BookmarkIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M12 23.3c-.1 0-.3 0-.4-.1-.4-.2-.6-.5-.6-.9V9.9c0-.7.5-1.3 1.2-1.5 2.4-.6 5.2-.6 7.7 0 .6.2 1.1.8 1.1 1.5v12.4c0 .4-.2.8-.6.9-.4.2-.8.1-1.1-.2L16 19.7 12.7 23c-.2.2-.4.3-.7.3zm4-4.6c.3 0 .5.1.7.3l3.3 3.3V9.9c0-.2-.2-.4-.4-.5-2.3-.5-4.9-.5-7.2 0-.2 0-.4.2-.4.5v12.4l3.3-3.3c.2-.2.4-.3.7-.3z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M19.8 8.4c-2.4-.6-5.2-.6-7.7 0-.6.2-1.1.8-1.1 1.5v12.4c0 .4.2.8.6.9.1.1.3.1.4.1.3 0 .5-.1.7-.3l3.3-3.3 3.3 3.3c.3.3.7.4 1.1.2.4-.2.6-.5.6-.9V9.9c0-.7-.5-1.3-1.2-1.5z"
      />
    </svg>
  ),
  displayName: 'BookmarkIcon',
});
