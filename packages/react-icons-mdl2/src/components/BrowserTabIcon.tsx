import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BrowserTabIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 256v1792H128V0h896v256h768zm-128 128H896V128H256v1792h1408V384z" />
    </svg>
  ),
  displayName: 'BrowserTabIcon',
});

export default BrowserTabIcon;
