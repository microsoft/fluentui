import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const TranscriptIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M22.5,10H9.5A1.51,1.51,0,0,0,8,11.5v10A1.51,1.51,0,0,0,9.5,23h13A1.51,1.51,0,0,0,24,21.5v-10A1.51,1.51,0,0,0,22.5,10ZM23,21.5a.51.51,0,0,1-.5.5H9.5a.51.51,0,0,1-.5-.5v-10a.51.51,0,0,1,.5-.5h13a.51.51,0,0,1,.5.5ZM17,13H11v1h6Zm3,3H11v1h9Zm-5,3H11v1h4Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M22.5,10H9.5A1.51,1.51,0,0,0,8,11.5v10A1.51,1.51,0,0,0,9.5,23h13A1.51,1.51,0,0,0,24,21.5v-10A1.51,1.51,0,0,0,22.5,10ZM11,13h6v1H11Zm4,7H11V19h4Zm5-3H11V16h9Z"
      />
    </svg>
  ),
  displayName: 'TranscriptIcon',
});
