import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FontIncreaseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1027 128l555 1664h-135l-170-512H643l-170 512H338L893 128h134zm207 1024L960 330l-274 822h548zm814-768h-640l320-320 320 320z" />
    </svg>
  ),
  displayName: 'FontIncreaseIcon',
});

export default FontIncreaseIcon;
