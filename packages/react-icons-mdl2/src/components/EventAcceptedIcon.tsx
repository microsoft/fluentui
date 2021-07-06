import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EventAcceptedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1024h-128V640H128v1152h896v128H0V128h384V0h128v128h1024V0h128v128h384zm-128 384V256h-256v128h-128V256H512v128H384V256H128v256h1792zm19 851l90 90-557 558-269-270 90-90 179 178 467-466z" />
    </svg>
  ),
  displayName: 'EventAcceptedIcon',
});

export default EventAcceptedIcon;
