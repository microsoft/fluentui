import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FaviconIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1664H0V128h2048zM128 256v256h1792V256H128zm1792 1408V640H128v1024h1792z" />
    </svg>
  ),
  displayName: 'FaviconIcon',
});

export default FaviconIcon;
