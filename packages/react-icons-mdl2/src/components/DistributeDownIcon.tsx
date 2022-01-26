import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DistributeDownIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1747 1587l90 90-365 365-365-365 90-90 211 211v-774H512v774l211-211 90 90-365 365-365-365 90-90 211 211V896h512V0h128v896h512v902l211-211z" />
    </svg>
  ),
  displayName: 'DistributeDownIcon',
});

export default DistributeDownIcon;
