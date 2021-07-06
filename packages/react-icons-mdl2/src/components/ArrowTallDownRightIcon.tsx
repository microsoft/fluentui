import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ArrowTallDownRightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 896v1152H896v-128h933L19 109l90-90 1811 1810V896h128z" />
    </svg>
  ),
  displayName: 'ArrowTallDownRightIcon',
});

export default ArrowTallDownRightIcon;
