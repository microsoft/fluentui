import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FontDecreaseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1027 768l342 1024h-135l-85-256H771l-85 256H551L893 768h134zm79 640L960 971l-146 437h292zM2048 0l-320 320L1408 0h640z" />
    </svg>
  ),
  displayName: 'FontDecreaseIcon',
});

export default FontDecreaseIcon;
