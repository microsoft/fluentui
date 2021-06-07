import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TriggerApprovalIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1883 768L603 2048H313l384-768H248L888 0h719l-384 768h660zm-310 128h-557l384-768H967L455 1152h449l-384 768h29L1573 896zm456 557l-557 558-269-270 90-90 179 178 467-466 90 90z" />
    </svg>
  ),
  displayName: 'TriggerApprovalIcon',
});

export default TriggerApprovalIcon;
