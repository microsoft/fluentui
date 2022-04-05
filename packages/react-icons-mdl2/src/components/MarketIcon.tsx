import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MarketIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 384v640h-128V603l-768 768-384-384-675 674-90-90 765-766 384 384 677-677h-421V384h640z" />
    </svg>
  ),
  displayName: 'MarketIcon',
});

export default MarketIcon;
