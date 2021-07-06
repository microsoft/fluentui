import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ZoomToFitIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M749 456l-90-91L1024 0l365 365-90 91-275-275-275 275zm550 1136l90 91-365 365-365-365 90-91 275 275 275-275zM456 749l-275 275 275 275-91 90L0 1024l365-365 91 90zm1592 275l-365 365-91-90 275-275-275-275 91-90 365 365zM640 640h768v768H640V640zm128 640h512V768H768v512z" />
    </svg>
  ),
  displayName: 'ZoomToFitIcon',
});

export default ZoomToFitIcon;
