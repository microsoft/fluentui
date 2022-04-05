import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BranchForkIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1946 1472l-365 365-90-90 210-211H0v-128h384V512h933l-210-211 90-90 365 365-365 365-90-90 210-211H512v768h1189l-210-211 90-90 365 365z" />
    </svg>
  ),
  displayName: 'BranchForkIcon',
});

export default BranchForkIcon;
