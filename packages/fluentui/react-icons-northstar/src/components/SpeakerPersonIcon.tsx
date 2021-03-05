import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const SpeakerPersonIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7Z" />
        <path d="M7.49998 10L12.5 10C13.3284 10 14 10.6716 14 11.5C14 12.6161 13.541 13.5103 12.7879 14.1148C12.0466 14.7098 11.0531 15 10 15C8.94692 15 7.95342 14.7098 7.21215 14.1148C6.45897 13.5103 6 12.6161 6 11.5C6 10.6716 6.67156 10 7.49998 10Z" />
        <path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10Z" />
      </g>
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7ZM7.49998 10L12.5 10C13.3284 10 14 10.6716 14 11.5C14 12.6161 13.541 13.5103 12.7879 14.1148C12.0466 14.7098 11.0531 15 10 15C8.94692 15 7.95342 14.7098 7.21215 14.1148C6.45897 13.5103 6 12.6161 6 11.5C6 10.6716 6.67156 10 7.49998 10Z"
      />
    </svg>
  ),
  displayName: 'SpeakerPersonIcon',
});
