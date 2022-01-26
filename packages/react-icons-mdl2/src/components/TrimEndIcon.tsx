import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TrimEndIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 0h1408v2048H384v-128h768V128H384V0zm1280 1920V128h-384v1792h384z" />
    </svg>
  ),
  displayName: 'TrimEndIcon',
});

export default TrimEndIcon;
