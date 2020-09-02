import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const GroupVideoCallGridIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg className={classes.svg} viewBox="8 8 16 16" role="presentation" focusable="false">
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M21.5,8A1.51,1.51,0,0,1,23,9.5v5a.51.51,0,0,1-.5.5h-6a.51.51,0,0,1-.5-.5v-6a.51.51,0,0,1,.5-.5Zm-7,8a.51.51,0,0,1,.5.5v6a.51.51,0,0,1-.5.5h-5A1.57,1.57,0,0,1,8,21.5v-5a.51.51,0,0,1,.5-.5ZM9,17v4.5a.51.51,0,0,0,.5.5H14V17Zm5.5-9a.51.51,0,0,1,.5.5v6a.51.51,0,0,1-.5.5h-6a.51.51,0,0,1-.5-.5v-5A1.54,1.54,0,0,1,9.5,8Zm-5,1a.51.51,0,0,0-.5.5V14h5V9Zm13,7a.51.51,0,0,1,.5.5v5A1.54,1.54,0,0,1,21.5,23h-5a.51.51,0,0,1-.5-.5v-6a.51.51,0,0,1,.5-.5ZM17,17v5h4.5a.51.51,0,0,0,.5-.5V17Zm0-8v5h5V9.5a.51.51,0,0,0-.5-.5Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M21.5,8A1.51,1.51,0,0,1,23,9.5v5a.51.51,0,0,1-.5.5h-6a.51.51,0,0,1-.5-.5v-6a.51.51,0,0,1,.5-.5Zm-7,8a.51.51,0,0,1,.5.5v6a.51.51,0,0,1-.5.5h-5A1.57,1.57,0,0,1,8,21.5v-5a.51.51,0,0,1,.5-.5Zm0-8a.51.51,0,0,1,.5.5v6a.51.51,0,0,1-.5.5h-6a.51.51,0,0,1-.5-.5v-5A1.54,1.54,0,0,1,9.5,8Zm8,8a.51.51,0,0,1,.5.5v5A1.54,1.54,0,0,1,21.5,23h-5a.51.51,0,0,1-.5-.5v-6a.51.51,0,0,1,.5-.5Z"
      />
    </svg>
  ),
  displayName: 'GroupVideoCallGridIcon',
});
