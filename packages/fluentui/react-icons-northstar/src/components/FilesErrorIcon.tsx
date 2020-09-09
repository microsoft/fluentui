import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const FilesErrorIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M3.258,5H5.977V1.9ZM6.977,1V6H2.992v8.5a.5.5,0,0,0,.5.5h9a.5.5,0,0,0,.5-.5V1.5a.5.5,0,0,0-.5-.5ZM8.492,12h-1V8h1Zm-.5.75a.75.75,0,1,1-.75.75A.782.782,0,0,1,7.992,12.75ZM12.492,0a1.531,1.531,0,0,1,1.5,1.5v13a1.531,1.531,0,0,1-1.5,1.5h-9a1.542,1.542,0,0,1-1.5-1.5V5.492A1.657,1.657,0,0,1,2.43,4.43L5.906.461A1.458,1.458,0,0,1,6.992,0Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M5.977,5h-3.9a2.364,2.364,0,0,1,.352-.57c.75-.946,1.6-1.8,2.375-2.719A8.855,8.855,0,0,1,5.977.406ZM7.492,8v4h1V8Zm.5,4.75a.75.75,0,1,0,.75.75A.783.783,0,0,0,7.992,12.75ZM12.492,0a1.521,1.521,0,0,1,1.5,1.5v13a1.521,1.521,0,0,1-1.5,1.5h-9a1.522,1.522,0,0,1-1.5-1.5V6H6.977V0Z"
      />
    </svg>
  ),
  displayName: 'FilesErrorIcon',
});
