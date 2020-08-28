// TODO: This is a Fluent icon. It has the same size, only artboard is 16x16 instead of original 20x20. This icon needs to be updated when moving to full set Fluent icons.
import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ZoomIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(iconClassNames.outline, classes.outlinePart)}
          d="M6.5,1a5.5,5.5,0,0,1,4.381,8.825l-.154.2,4.127,4.126a.5.5,0,0,1-.562.809l-.076-.044-.07-.057L10.02,10.727A5.5,5.5,0,1,1,6.5,1Zm0,1A4.5,4.5,0,1,0,11,6.5,4.5,4.5,0,0,0,6.5,2Z"
        />
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M6.5,1a5.5,5.5,0,0,1,4.383,8.823h0L15.03,13.97a.75.75,0,0,1-.976,1.133h0l-.084-.073L9.823,10.883A5.5,5.5,0,1,1,6.5,1Z"
        />
      </g>
    </svg>
  ),
  displayName: 'ZoomIcon',
});
