// TODO: This is a Fluent icon. It has the same size, only artboard is 16x16 instead of original 20x20. This icon needs to be updated when moving to full set Fluent icons.
import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ZoomInIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(iconClassNames.outline, classes.outlinePart)}
          d="M6.5,1a5.5,5.5,0,0,1,4.227,9.02l4.127,4.126a.5.5,0,0,1-.638.765l-.07-.057L10.02,10.727A5.5,5.5,0,1,1,6.5,1Zm0,1A4.5,4.5,0,1,0,11,6.5,4.5,4.5,0,0,0,6.5,2Zm0,1.5a.5.5,0,0,1,.492.41L7,4V6H9a.5.5,0,0,1,.09.992L9,7H7V9a.5.5,0,0,1-.992.09L6,9V7H4a.5.5,0,0,1-.09-.992L4,6H6V4A.5.5,0,0,1,6.5,3.5Z"
        />
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M6.5,1a5.5,5.5,0,0,1,4.383,8.823h0L15.03,13.97a.75.75,0,0,1-.976,1.133h0l-.084-.073L9.823,10.883A5.5,5.5,0,1,1,6.5,1Zm0,2.25A.75.75,0,0,0,5.75,4V5.75H4a.75.75,0,0,0,0,1.5H5.75V9a.75.75,0,0,0,1.5,0V7.25H9a.75.75,0,0,0,0-1.5H7.25V4A.75.75,0,0,0,6.5,3.25Z"
        />
      </g>
    </svg>
  ),
  displayName: 'ZoomInIcon',
});
