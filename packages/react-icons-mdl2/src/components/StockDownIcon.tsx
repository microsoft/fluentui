import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StockDownIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 384h1280l-640 1280L384 384z" />
    </svg>
  ),
  displayName: 'StockDownIcon',
});

export default StockDownIcon;
