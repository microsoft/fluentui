import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const NavigationFlipperIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M771 1315l290-291-290-291 90-90 382 381-382 381-90-90zM1664 0v2048H256V0h1408zm-128 128H384v1792h1152V128z" />
    </svg>
  ),
  displayName: 'NavigationFlipperIcon',
});

export default NavigationFlipperIcon;
