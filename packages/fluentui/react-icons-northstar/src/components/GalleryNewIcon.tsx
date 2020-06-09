import * as React from 'react';
import cx from 'classnames';
import createSvgIcon from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

const GalleryNewIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M23,8H9A1,1,0,0,0,8,9V23a1,1,0,0,0,1,1H23a1,1,0,0,0,1-1V9A1,1,0,0,0,23,8Zm.143,1.19v6.381H16.429V8.857H22.81A.333.333,0,0,1,23.143,9.19ZM9.19,8.857h6.381v6.714H8.857V9.19A.333.333,0,0,1,9.19,8.857ZM8.857,22.81V16.429h6.714v6.714H9.19A.333.333,0,0,1,8.857,22.81Zm13.953.333H16.429V16.429h6.714V22.81A.333.333,0,0,1,22.81,23.143Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M23,8H9A1,1,0,0,0,8,9V23a1,1,0,0,0,1,1H23a.979.979,0,0,0,.613-.23h.019v-.012A.984.984,0,0,0,24,23V9A1,1,0,0,0,23,8Zm.143,8.429H16.428v6.714h-.857V16.429H8.857v-.858h6.714V8.85h.857v6.721h6.715Z"
      />
    </svg>
  ),
  displayName: 'GalleryNewIcon',
});

export default GalleryNewIcon;
