import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PlayIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 1024L512 1920V128l1280 896zM640 1674l929-650-929-650v1300z" />
    </svg>
  ),
  displayName: 'PlayIcon',
});

export default PlayIcon;
