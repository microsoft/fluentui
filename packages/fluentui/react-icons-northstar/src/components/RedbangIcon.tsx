import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const RedbangIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M10 2C8.34315 2 7 3.34315 7 5C7 7.22661 7.78878 10.2037 8.22483 11.6854C8.45862 12.4798 9.19005 13 10.0013 13C10.8107 13 11.5413 12.482 11.7759 11.6891C12.2124 10.2137 13 7.25038 13 5C13 3.34315 11.6569 2 10 2Z" />
        <path d="M10 14C8.89543 14 8 14.8954 8 16C8 17.1046 8.89543 18 10 18C11.1046 18 12 17.1046 12 16C12 14.8954 11.1046 14 10 14Z" />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M10 2C8.34315 2 7 3.34315 7 5C7 7.22661 7.78878 10.2037 8.22483 11.6854C8.45862 12.4798 9.19005 13 10.0013 13C10.8107 13 11.5413 12.482 11.7759 11.6891C12.2124 10.2137 13 7.25038 13 5C13 3.34315 11.6569 2 10 2Z" />
        <path d="M10 14C8.89543 14 8 14.8954 8 16C8 17.1046 8.89543 18 10 18C11.1046 18 12 17.1046 12 16C12 14.8954 11.1046 14 10 14Z" />
      </g>
    </svg>
  ),
  displayName: 'RedbangIcon',
});
