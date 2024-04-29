import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const RedbangIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M10 3C8.89543 3 8 3.89543 8 5C8 7.0652 8.74619 9.9149 9.18415 11.4031C9.28797 11.7559 9.61657 12 10.0013 12C10.3852 12 10.713 11.7569 10.817 11.4054C11.2548 9.92542 12 7.08892 12 5C12 3.89543 11.1046 3 10 3ZM7 5C7 3.34315 8.34315 2 10 2C11.6569 2 13 3.34315 13 5C13 7.25038 12.2124 10.2137 11.7759 11.6891C11.5413 12.482 10.8107 13 10.0013 13C9.19005 13 8.45862 12.4798 8.22483 11.6854C7.78878 10.2037 7 7.22661 7 5ZM10 15C9.44772 15 9 15.4477 9 16C9 16.5523 9.44772 17 10 17C10.5523 17 11 16.5523 11 16C11 15.4477 10.5523 15 10 15ZM8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18C8.89543 18 8 17.1046 8 16Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M10 2C8.34315 2 7 3.34315 7 5C7 7.22661 7.78878 10.2037 8.22483 11.6854C8.45862 12.4798 9.19005 13 10.0013 13C10.8107 13 11.5413 12.482 11.7759 11.6891C12.2124 10.2137 13 7.25038 13 5C13 3.34315 11.6569 2 10 2ZM10 14C8.89543 14 8 14.8954 8 16C8 17.1046 8.89543 18 10 18C11.1046 18 12 17.1046 12 16C12 14.8954 11.1046 14 10 14Z"
      />
    </svg>
  ),
  displayName: 'RedbangIcon',
});
