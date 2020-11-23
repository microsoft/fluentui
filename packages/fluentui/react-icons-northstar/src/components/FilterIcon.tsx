import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const FilterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 18 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M12.609,11l3.008,3.383a1.475,1.475,0,0,1,.278.465,1.519,1.519,0,0,1,.1.535V21h1V15.383a1.521,1.521,0,0,1,.1-.535,1.455,1.455,0,0,1,.277-.465L20.375,11Zm8.883-1a.505.505,0,0,1,.5.5.5.5,0,0,1-.125.336l-3.75,4.211a.509.509,0,0,0-.125.336V21.5a.505.505,0,0,1-.5.5h-2a.507.507,0,0,1-.5-.5V15.383a.5.5,0,0,0-.125-.336l-3.75-4.211a.509.509,0,0,1-.125-.336.507.507,0,0,1,.5-.5Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M21.492,10a.505.505,0,0,1,.5.5.5.5,0,0,1-.125.336l-3.75,4.211a.509.509,0,0,0-.125.336V21.5a.505.505,0,0,1-.5.5h-2a.507.507,0,0,1-.5-.5V15.383a.5.5,0,0,0-.125-.336l-3.75-4.211a.509.509,0,0,1-.125-.336.507.507,0,0,1,.5-.5Z"
      />
    </svg>
  ),
  displayName: 'FilterIcon',
});
