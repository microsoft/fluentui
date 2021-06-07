import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FontColorAIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1582 1664h-135l-170-512H643l-170 512H338L893 0h134l555 1664zm-348-640L960 203l-274 821h548z" />
    </svg>
  ),
  displayName: 'FontColorAIcon',
});

export default FontColorAIcon;
