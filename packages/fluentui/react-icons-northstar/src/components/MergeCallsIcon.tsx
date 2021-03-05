import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const MergeCallsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg className={classes.svg} viewBox="8 8 16 16" role="presentation" focusable="false">
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M11.61,11a1.49,1.49,0,0,1,1,.38L16.68,15h4.6l-2.64-2.65A.5.5,0,0,1,19,11.5a.47.47,0,0,1,.35.15l3.5,3.5a.48.48,0,0,1,0,.7l-3.5,3.5a.47.47,0,0,1-.35.15.5.5,0,0,1-.35-.85L21.28,16h-4.6l-4.07,3.62a1.52,1.52,0,0,1-1,.38H9.49a.51.51,0,0,1-.5-.5C9,19,9.53,19,9.9,19s.95.07,1.43.07a1,1,0,0,0,.62-.15l3.79-3.38L12,12.12a1,1,0,0,0-.62-.15c-.48,0-.95.07-1.42.07S9,12,9,11.5a.51.51,0,0,1,.5-.5Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M11.61,10.5a2,2,0,0,1,1.33.51l3.94,3.49h3.2l-1.8-1.79A1,1,0,0,1,18,12a1,1,0,0,1,1-1,.94.94,0,0,1,.71.29l3.5,3.5a1,1,0,0,1,0,1.42l-3.5,3.5A.94.94,0,0,1,19,20a1,1,0,0,1-1-1,1,1,0,0,1,.29-.71l1.8-1.79h-3.2L12.94,20a1.94,1.94,0,0,1-1.33.51H9.49a1,1,0,0,1,0-2h2.12l3.37-3-3.37-3H9.49a1,1,0,0,1,0-2Z"
      />
    </svg>
  ),
  displayName: 'MergeCallsIcon',
});
