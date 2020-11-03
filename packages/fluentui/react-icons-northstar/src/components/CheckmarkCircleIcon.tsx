// This is Fluent icon. Originally on a 20x20 canvas. No resize, just 'viewBox' update.
import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const CheckmarkCircleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M8,0A8,8,0,1,1,0,8,8,8,0,0,1,8,0ZM8,1a7,7,0,1,0,7,7A7,7,0,0,0,8,1Zm3.358,4.646a.5.5,0,0,1,.058.638l-.058.07-4,4a.5.5,0,0,1-.638.058l-.07-.058-2-2a.5.5,0,0,1,.638-.765l.07.058L7,9.3l3.651-3.652A.5.5,0,0,1,11.358,5.646Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M8,0A8,8,0,1,1,0,8,8,8,0,0,1,8,0Zm3.358,5.646a.5.5,0,0,0-.637-.057l-.07.057L7,9.3,5.354,7.651l-.07-.058a.5.5,0,0,0-.695.7l.057.069,2,2,.07.058a.5.5,0,0,0,.568,0l.07-.058,4-4,.058-.07A.5.5,0,0,0,11.358,5.646Z"
      />
    </svg>
  ),
  displayName: 'CheckmarkCircleIcon',
});
