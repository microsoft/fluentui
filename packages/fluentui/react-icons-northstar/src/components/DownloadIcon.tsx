import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const DownloadIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M20.1 16.6L17 19.8V9.5c0-.8-1-.8-1 0v10.3l-3.1-3.1c-.5-.5-1.2.2-.7.7l4 4c.2.2.6.1.7 0l4-4c.5-.7-.4-1.3-.8-.8zM21 24h-9c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h9c.3 0 .5.2.5.5s-.2.5-.5.5z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M21 23h-9c-.28 0-.5.22-.5.5s.22.5.5.5h9c.28 0 .5-.22.5-.5s-.22-.5-.5-.5zm-5.21-1.29c.2.2.45.29.71.29s.51-.1.71-.29l4-4a.996.996 0 1 0-1.41-1.41l-2.29 2.29V9.5c0-.55-.45-1-1-1s-1 .45-1 1v9.09l-2.29-2.29a.996.996 0 1 0-1.41 1.41l3.98 4z"
      />
    </svg>
  ),
  displayName: 'DownloadIcon',
});
