import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const CameraIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M18.5,13.5A2.5,2.5,0,1,0,21,16,2.518,2.518,0,0,0,18.5,13.5Zm0-1A3.5,3.5,0,1,1,15,16,3.525,3.525,0,0,1,18.5,12.5ZM9.5,11a.5.5,0,0,0-.5.5v9a.5.5,0,0,0,.5.5h13a.5.5,0,0,0,.5-.5v-9a.5.5,0,0,0-.5-.5ZM12,12.5A1.5,1.5,0,1,1,10.5,14,1.531,1.531,0,0,1,12,12.5ZM22.5,10A1.531,1.531,0,0,1,24,11.5v9A1.531,1.531,0,0,1,22.5,22H9.5A1.542,1.542,0,0,1,8,20.5v-9A1.531,1.531,0,0,1,9.5,10Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M18.5,12.5A3.5,3.5,0,1,0,22,16,3.525,3.525,0,0,0,18.5,12.5Zm0,1a2.5,2.5,0,0,1,0,5,2.5,2.5,0,0,1,0-5Zm-6.5-1A1.5,1.5,0,1,0,13.5,14,1.522,1.522,0,0,0,12,12.5ZM22.5,10A1.522,1.522,0,0,1,24,11.5v9A1.522,1.522,0,0,1,22.5,22H9.5A1.522,1.522,0,0,1,8,20.5v-9A1.522,1.522,0,0,1,9.5,10Z"
      />
    </svg>
  ),
  displayName: 'CameraIcon',
});
