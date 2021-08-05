import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FocusIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 120q125 0 240 32t216 91 183 141 141 183 91 216 33 241q0 125-32 240t-91 216-141 183-183 141-216 91-241 33q-125 0-240-32t-216-91-183-141-141-183-91-216-33-241q0-125 32-240t91-216 141-183 183-141 216-91 241-33zm0 1680q107 0 206-28t185-78 157-121 121-157 79-186 28-206q0-107-28-206t-78-185-121-157-157-121-186-79-206-28q-107 0-206 28t-185 78-157 121-121 157-79 186-28 206q0 107 28 206t78 185 121 157 157 121 186 79 206 28zm280-1160q21 0 40 8t33 22 23 34 8 40v560q0 21-8 40t-22 33-34 23-40 8H744q-21 0-40-8t-33-22-23-34-8-40V744q0-21 8-40t22-33 34-23 40-8h560zm-24 128H768v512h512V768z" />
    </svg>
  ),
  displayName: 'FocusIcon',
});

export default FocusIcon;
