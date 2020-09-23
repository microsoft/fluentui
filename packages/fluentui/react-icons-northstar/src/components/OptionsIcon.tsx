import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const OptionsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 18 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M14,17a2,2,0,0,1,1.937,1.5H21.5a.5.5,0,0,1,.09.992l-.09.008H15.937a2,2,0,0,1-3.874,0H10.5a.5.5,0,0,1-.09-.992l.09-.008h1.563A2,2,0,0,1,14,17Zm0,1a1,1,0,1,0,1,1A1,1,0,0,0,14,18Zm4-7a2,2,0,0,1,1.937,1.5H21.5a.5.5,0,0,1,.09.992l-.09.008H19.937a2,2,0,0,1-3.874,0H10.5a.5.5,0,0,1-.09-.992l.09-.008h5.563A2,2,0,0,1,18,11Zm0,1a1,1,0,1,0,1,1A1,1,0,0,0,18,12Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M14,17a2,2,0,0,1,1.937,1.5H21.5a.5.5,0,0,1,.09.992l-.09.008H15.937a2,2,0,0,1-3.874,0H10.5a.5.5,0,0,1-.09-.992l.09-.008h1.563A2,2,0,0,1,14,17Zm4-6a2,2,0,0,1,1.937,1.5H21.5a.5.5,0,0,1,.09.992l-.09.008H19.937a2,2,0,0,1-3.874,0H10.5a.5.5,0,0,1-.09-.992l.09-.008h5.563A2,2,0,0,1,18,11Z"
      />
    </svg>
  ),
  displayName: 'OptionsIcon',
});
