import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const GalleryNewIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M22,8H9A1,1,0,0,0,8,9V22a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V9A1,1,0,0,0,22,8ZM9,9h6v6H9ZM9,22V16h6v6Zm13,0H16V16h6Zm-6-7V9h6v6Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M22,8H9A1,1,0,0,0,8,9V22a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V9A1,1,0,0,0,22,8Zm-.017,8H16v6H15V16H9V15h6V9h1v6h5.983Z"
      />
    </svg>
  ),
  displayName: 'GalleryNewIcon',
});
