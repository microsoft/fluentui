import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ExclamationTriangleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="8 8 16 16">
      <g>
        <path
          className={cx(iconClassNames.outline, classes.outlinePart)}
          d="M23.7 20.3L17.6 9.9c-.2-.3-.4-.5-.7-.7-.6-.3-1.3-.3-1.9 0-.3.2-.5.4-.7.7l-6 10.4c-.2.2-.3.6-.3.9 0 .5.2.9.5 1.3.4.3.9.5 1.4.5h12.3c.5 0 1-.2 1.3-.5.4-.4.5-.8.5-1.3 0-.3-.1-.7-.3-.9zm-.9 1.5c-.2.2-.4.3-.7.3H9.9c-.3 0-.5-.1-.7-.3-.2-.2-.3-.4-.3-.6 0-.2 0-.3.1-.4l6.1-10.4.3-.3c.1-.1.3-.1.5-.1s.3 0 .5.1c.1.1.3.2.3.3l6.1 10.4c.1.1.1.3.1.4.2.2.1.4-.1.6zM16 18.3c.3 0 .5-.2.5-.5v-4.7c0-.3-.2-.5-.5-.5s-.5.2-.5.5v4.7c0 .3.2.5.5.5z"
        />
        <circle className={cx(iconClassNames.outline, classes.outlinePart)} cx="16" cy="20.4" r=".7" />
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M23.7,20L17.6,9.7c-0.1-0.2-0.3-0.4-0.5-0.5C16.9,9.1,16.7,9,16.4,9c-0.2,0-0.5,0.1-0.7,0.2c-0.2,0.1-0.4,0.3-0.5,0.5 L9.2,20C9.1,20.2,9,20.4,9,20.7c0,0.4,0.1,0.7,0.4,1c0.3,0.3,0.6,0.4,1,0.4h12.1c0.4,0,0.7-0.1,1-0.4c0.3-0.3,0.4-0.6,0.4-1 C23.9,20.4,23.8,20.2,23.7,20z M16,12.6c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5v4.7c0,0.3-0.2,0.5-0.5,0.5S16,17.6,16,17.3V12.6z M16.5,20.8c-0.4,0-0.8-0.3-0.8-0.8c0-0.4,0.3-0.8,0.8-0.8s0.8,0.3,0.8,0.8C17.3,20.4,16.9,20.8,16.5,20.8z"
        />
      </g>
    </svg>
  ),
  displayName: 'ExclamationTriangleIcon',
});
