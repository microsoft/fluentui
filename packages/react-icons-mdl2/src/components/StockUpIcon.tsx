import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StockUpIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 384l640 1280H384l640-1280z" />
    </svg>
  ),
  displayName: 'StockUpIcon',
});

export default StockUpIcon;
