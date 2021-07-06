import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EventTentativeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v896h-128V640H128v1152h1408v128H0V128h384V0h128v128h1024V0h128v128h384zm-128 384V256h-256v128h-128V256H512v128H384V256H128v256h1792zm-256 1408h128v128h-128v-128zm64-768q53 0 99 20t82 55 55 81 20 100q0 46-14 81t-35 63-47 50-46 45-36 45-14 52v48h-128v-48q0-47 14-81t35-63 47-50 46-45 36-45 14-52q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50h-128q0-53 20-99t55-82 81-55 100-20z" />
    </svg>
  ),
  displayName: 'EventTentativeIcon',
});

export default EventTentativeIcon;
