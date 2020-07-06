import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ParticipantAddIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M21.5 18h-13c-.3 0-.5.2-.5.5v.6c0 2.4 3.5 3.7 7 3.7 4.1 0 7-1.5 7-3.7v-.6c0-.3-.2-.5-.5-.5zm-.5 1.1c0 1.5-2.6 2.7-6 2.7s-6-1.2-6-2.7V19l12 .1zM15 16c1.9 0 3.5-1.6 3.5-3.5S16.9 9 15 9s-3.5 1.6-3.5 3.5S13.1 16 15 16zm0-6c1.4 0 2.5 1.1 2.5 2.5S16.4 15 15 15s-2.5-1.1-2.5-2.5S13.6 10 15 10zm8.5 0H22V8.5c0-.3-.2-.5-.5-.5s-.5.2-.5.5V10h-1.5c-.3 0-.5.2-.5.5s.2.5.5.5H21v1.5c0 .3.2.5.5.5s.5-.2.5-.5V11h1.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M21.5 18h-13c-.3 0-.5.2-.5.5v.6c0 2.4 3.5 3.7 7 3.7 4.1 0 7-1.5 7-3.7v-.6c0-.3-.2-.5-.5-.5zM9 19.1c-6 8.6-3 4.3 0 0zm6-3.1c1.9 0 3.5-1.6 3.5-3.5S16.9 9 15 9s-3.5 1.6-3.5 3.5S13.1 16 15 16zm8.5-6H22V8.5c0-.3-.2-.5-.5-.5s-.5.2-.5.5V10h-1.5c-.3 0-.5.2-.5.5s.2.5.5.5H21v1.5c0 .3.2.5.5.5s.5-.2.5-.5V11h1.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5z"
      />
    </svg>
  ),
  displayName: 'ParticipantAddIcon',
});
