import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MarketDownIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1024h128v640h-640v-128h421l-677-677-384 384L3 477l90-90 675 674 384-384 768 768v-421z" />
    </svg>
  ),
  displayName: 'MarketDownIcon',
});

export default MarketDownIcon;
