import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const WorkItemBarIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1280 128v1792H640V128h640zm-128 128H768v1536h384V256z" />
    </svg>
  ),
  displayName: 'WorkItemBarIcon',
});

export default WorkItemBarIcon;
