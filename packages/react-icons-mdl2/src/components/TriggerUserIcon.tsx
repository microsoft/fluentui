import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TriggerUserIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1883 768L603 2048H313l384-768H248L888 0h719l-384 768h660zm-310 128h-557l384-768H967L455 1152h449l-384 768h29L1573 896zm275 817q46 25 83 61t63 79 40 93 14 102h-128q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100h-128q0-52 14-101t40-93 63-80 83-61q-34-35-53-81t-19-96q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100q0 50-19 96t-53 81zm-184-49q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10z" />
    </svg>
  ),
  displayName: 'TriggerUserIcon',
});

export default TriggerUserIcon;
