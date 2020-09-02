import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const CallControlStopPresentingNewIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M22.5 9h-13C8.673 9 8 9.673 8 10.5v9c0 .827.673 1.5 1.5 1.5h2.007a.5.5 0 1 0 0-1H9.5a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v9c0 .275-.225.5-.5.5h-2.066a.5.5 0 1 0 0 1H22.5c.827 0 1.5-.673 1.5-1.5v-9c0-.827-.673-1.5-1.5-1.5z"
      />
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M18.854 16.646a.5.5 0 0 0-.708 0L16 18.793l-2.146-2.147a.5.5 0 1 0-.708.708l2.147 2.146-2.147 2.146a.5.5 0 1 0 .708.708L16 20.207l2.146 2.147a.498.498 0 0 0 .708 0 .5.5 0 0 0 0-.708L16.707 19.5l2.147-2.146a.5.5 0 0 0 0-.708z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M22.5 9h-13C8.673 9 8 9.673 8 10.5v9c0 .827.673 1.5 1.5 1.5h2.007a.5.5 0 1 0 0-1H9.5a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v9c0 .275-.225.5-.5.5h-2.066a.5.5 0 1 0 0 1H22.5c.827 0 1.5-.673 1.5-1.5v-9c0-.827-.673-1.5-1.5-1.5z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M19.207 16.293a1 1 0 0 0-1.414 0L16 18.086l-1.793-1.793a1 1 0 1 0-1.414 1.414l1.793 1.793-1.793 1.793a1 1 0 1 0 1.414 1.414L16 20.914l1.793 1.793a.997.997 0 0 0 1.414 0 1 1 0 0 0 0-1.414L17.414 19.5l1.793-1.793a1 1 0 0 0 0-1.414z"
      />
    </svg>
  ),
  displayName: 'CallControlStopPresentingNewIcon',
});
