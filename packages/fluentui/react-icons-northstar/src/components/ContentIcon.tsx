import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ContentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M17.664,19.523h3.672v.86H17.664Zm-7-1.953h2.813v-2.8h.054a2.809,2.809,0,1,1-2.867,2.8Zm7-.429h3.672V18H17.664Zm0-2.375h3.672v.851H17.664Zm-7-3.149H21.336v.86H10.664ZM9,24a.988.988,0,0,1-1-1V9A.988.988,0,0,1,9,8H23a.988.988,0,0,1,1,1V23a.988.988,0,0,1-1,1ZM8.859,9.188V22.812a.331.331,0,0,0,.329.329H22.812a.331.331,0,0,0,.329-.329V9.188a.331.331,0,0,0-.329-.329H9.188A.331.331,0,0,0,8.859,9.188Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M23,8H9A.988.988,0,0,0,8,9V23a1,1,0,0,0,1,1H23a.988.988,0,0,0,1-1V9A.988.988,0,0,0,23,8ZM13.477,20.383a2.821,2.821,0,0,1-2.813-2.813h2.813v-2.8h.054a2.809,2.809,0,0,1-.054,5.617Zm4.187,0v-.86h3.672v.86Zm0-2.383v-.859h3.672V18Zm0-2.383v-.851h3.672v.851Zm-7-3.14v-.86H21.336v.86Z"
      />
    </svg>
  ),
  displayName: 'ContentIcon',
});
