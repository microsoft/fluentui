import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FontSizeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1966 1792h-135l-170-512h-634l-170 512H722l-85-256H259l-85 256H39L381 768h134l274 821 488-1461h134l555 1664zM594 1408L448 971l-146 437h292zm1024-256l-274-821-274 821h548z" />
    </svg>
  ),
  displayName: 'FontSizeIcon',
});

export default FontSizeIcon;
