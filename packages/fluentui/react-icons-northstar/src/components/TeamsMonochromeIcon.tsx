import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const TeamsMonochromeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M12.75,19.25v-5h-2v-1.5h5.5v1.5h-2v5ZM23,18.891a1.732,1.732,0,0,1-2.133,1.679A4.4,4.4,0,0,0,21,19.5V15h2ZM20,19.5A3.5,3.5,0,0,1,13.344,21H17a1.007,1.007,0,0,0,1-1V15h2ZM17,9a2,2,0,0,1,2,2,1.977,1.977,0,0,1-1,1.727V12a1.007,1.007,0,0,0-1-1H15A2,2,0,0,1,17,9Zm6.18,5H18v-.172A3,3,0,1,0,14,11H9a1.007,1.007,0,0,0-1,1v8a1.007,1.007,0,0,0,1,1h3.258a4.5,4.5,0,0,0,8.265.523,2.544,2.544,0,0,0,.735.094,2.726,2.726,0,0,0,2.734-2.726V14.82A.808.808,0,0,0,23.18,14ZM22,10a1,1,0,1,1-1,1A1.007,1.007,0,0,1,22,10Zm0,3a2,2,0,1,0-2-2A2,2,0,0,0,22,13Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M12.75,19.25v-5h-2v-1.5h5.5v1.5h-2v5ZM23,18.891a1.732,1.732,0,0,1-2.133,1.679A4.4,4.4,0,0,0,21,19.5V15h2ZM20,19.5A3.5,3.5,0,0,1,13.344,21H17a1.007,1.007,0,0,0,1-1V15h2ZM17,9a2,2,0,0,1,2,2,1.977,1.977,0,0,1-1,1.727V12a1.007,1.007,0,0,0-1-1H15A2,2,0,0,1,17,9Zm6.18,5H18v-.172A3,3,0,1,0,14,11H9a1.007,1.007,0,0,0-1,1v8a1.007,1.007,0,0,0,1,1h3.258a4.5,4.5,0,0,0,8.265.523,2.544,2.544,0,0,0,.735.094,2.726,2.726,0,0,0,2.734-2.726V14.82A.808.808,0,0,0,23.18,14ZM22,10a1,1,0,1,1-1,1A1.007,1.007,0,0,1,22,10Zm0,3a2,2,0,1,0-2-2A2,2,0,0,0,22,13Z"
      />
    </svg>
  ),
  displayName: 'TeamsMonochromeIcon',
});
