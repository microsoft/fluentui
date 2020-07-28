import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const GalleryNewLargeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M23,8H9A1,1,0,0,0,8,9V23a1,1,0,0,0,1,1H23a1,1,0,0,0,1-1V9A1,1,0,0,0,23,8Zm.143,1.19v3.739H19.1V8.857H22.81A.333.333,0,0,1,23.143,9.19Zm-9.381,4.6h4.476v4.428H13.762Zm-.857,4.428H8.857V13.786h4.048Zm.857-5.285V8.857h4.476v4.072Zm5.333.857h4.048v4.428H19.1ZM9.19,8.857h3.715v4.072H8.857V9.19A.333.333,0,0,1,9.19,8.857ZM8.857,22.81V19.071h4.048v4.072H9.19A.333.333,0,0,1,8.857,22.81Zm4.905.333V19.071h4.476v4.072Zm9.048,0H19.1V19.071h4.048V22.81A.333.333,0,0,1,22.81,23.143Z"
      />
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <rect x="13.762" y="13.786" width="4.476" height="4.429" />
        <path d="M23,8H9A1,1,0,0,0,8,9V23a1,1,0,0,0,1,1H23a1,1,0,0,0,1-1V9A1,1,0,0,0,23,8Zm.143,5.786H19.1v4.428h4.048v.857H19.1v4.072h-.857V19.071H13.762v4.072h-.857V19.071H8.857v-.857h4.048V13.786H8.857v-.857h4.048V8.845h.857v4.084h4.476V8.845H19.1v4.084h4.048Z" />
      </g>
    </svg>
  ),
  displayName: 'GalleryNewLargeIcon',
});
