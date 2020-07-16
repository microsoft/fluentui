import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const CallVideoOffIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(iconClassNames.outline, classes.outlinePart)}
          d="M23.2 12.1l-2.5 2.4c-.5.4-.7 1-.7 1.5s.2 1.1.6 1.4l2.5 2.4c.1.1.8.4.8-.4v-7c.1-.6-.6-.4-.7-.3zm-.2 6.2l-1.7-1.6c-.2-.2-.3-.4-.3-.7s.1-.5.3-.7l1.7-1.6v4.6zM9 20.8l.8-.8c-.2 0-.4-.2-.5-.5-.2-1.1-.3-2.3-.3-3.5s.1-2.4.3-3.5c.1-.3.3-.5.5-.5h7.7c.1 0 .2 0 .2.1l.7-.7c-.3-.2-.6-.3-.9-.3H9.8c-.7 0-1.3.5-1.5 1.3-.2 1.1-.3 2.3-.3 3.6s.1 2.5.4 3.7c0 .5.3.8.6 1.1zM23.9 8.9c.2-.2.2-.5 0-.7s-.5-.2-.7 0l-15 15c-.2.2-.2.5 0 .7 0 .1.2.1.3.1s.3 0 .4-.1l2.9-2.9h5.8c.8 0 1.5-.7 1.5-1.5v-5.8l4.8-4.8zM18 19.5c0 .3-.2.5-.5.5h-4.8l5.3-5.3v4.8z"
        />
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M23.697 12.04a.5.5 0 0 0-.542.098l-2.532 2.417A1.981 1.981 0 0 0 20 16c0 .548.221 1.062.623 1.445l2.532 2.417A.5.5 0 0 0 24 19.5v-7a.5.5 0 0 0-.303-.46zM9.033 20.753l9.41-9.41A1.485 1.485 0 0 0 17.5 11H9.82c-.706 0-1.324.54-1.47 1.282C8.118 13.462 8 14.712 8 16s.118 2.538.35 3.717c.087.443.343.81.683 1.037zm14.82-11.9a.5.5 0 1 0-.707-.707l-4.165 4.166c-.004-.028-.003-.057-.009-.084L10.201 21h.092l-2.147 2.147a.5.5 0 1 0 .707.707L11.707 21H17.5c.827 0 1.5-.673 1.5-1.5v-5.793l4.854-4.854z"
        />
      </g>
    </svg>
  ),
  displayName: 'CallVideoOffIcon',
});
