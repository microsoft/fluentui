import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const VideoCameraEmphasisIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M4.5 4C3.11929 4 2 5.11929 2 6.5V13.5C2 14.8807 3.11929 16 4.5 16H11.5C12.8807 16 14 14.8807 14 13.5V12.5L16.4 14.3C17.0592 14.7944 18 14.324 18 13.5V6.49998C18 5.67594 17.0592 5.20556 16.4 5.69998L14 7.49998V6.5C14 5.11929 12.8807 4 11.5 4H4.5ZM14 8.74998L17 6.49998V13.5L14 11.25V8.74998ZM13 6.5V13.5C13 14.3284 12.3284 15 11.5 15H4.5C3.67157 15 3 14.3284 3 13.5V6.5C3 5.67157 3.67157 5 4.5 5H11.5C12.3284 5 13 5.67157 13 6.5Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M13 6.5C13 5.11929 11.8807 4 10.5 4H4.5C3.11929 4 2 5.11929 2 6.5V13.5C2 14.8807 3.11929 16 4.5 16H10.5C11.8807 16 13 14.8807 13 13.5V6.5ZM14 7.93082V12.0815L16.7642 14.4319C17.2512 14.8461 18 14.4999 18 13.8606V6.19315C18 5.55685 17.2575 5.20962 16.7692 5.61756L14 7.93082Z"
      />
    </svg>
  ),
  displayName: 'VideoCameraEmphasisIcon',
});
