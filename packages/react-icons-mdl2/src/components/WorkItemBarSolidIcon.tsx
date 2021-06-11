import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const WorkItemBarSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1280 128v1792H640V128h640z" />
    </svg>
  ),
  displayName: 'WorkItemBarSolidIcon',
});

export default WorkItemBarSolidIcon;
