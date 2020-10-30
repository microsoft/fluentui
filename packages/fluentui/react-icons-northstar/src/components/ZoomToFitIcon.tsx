// TODO: This is a Fluent icon. It has the same size, only artboard is 16x16 instead of original 20x20. This icon needs to be updated when moving to full set Fluent icons.
import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ZoomToFitIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(iconClassNames.outline, classes.outlinePart)}
          d="M5.852,3.562l-.7-.71L8,0l2.852,2.852-.7.71L8,1.414Zm4.3,8.876.7.71L8,16,5.148,13.148l.7-.71L8,14.586ZM3.562,5.852,1.414,8l2.148,2.148-.71.7L0,8,2.852,5.148ZM16,8l-2.852,2.852-.71-.7L14.586,8,12.438,5.852l.71-.7ZM5,5h6v6H5Zm1,5h4V6H6Z"
        />
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M5.852,3.562l-.7-.71L8,0l2.852,2.852-.7.71L8,1.414Zm4.3,8.876.7.71L8,16,5.148,13.148l.7-.71L8,14.586ZM3.563,5.852,1.414,8l2.149,2.148-.711.7L0,8,2.852,5.148ZM16,8l-2.852,2.852-.71-.7L14.586,8,12.438,5.852l.71-.7ZM5,5h6v6H5Z"
        />
      </g>
    </svg>
  ),
  displayName: 'ZoomToFitIcon',
});
