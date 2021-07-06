import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EventTentativeMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 128v896h128V640h1792v1152H512v128h1536V128h-384V0h-128v128H512V0H384v128H0zm128 384V256h256v128h128V256h1024v128h128V256h256v256H128zm256 1408H256v128h128v-128zm-64-768q-53 0-99 20t-82 55-55 81-20 100q0 46 14 81t35 63 47 50 46 45 36 45 14 52v48h128v-48q0-47-14-81t-35-63-47-50-46-45-36-45-14-52q0-27 10-50t27-40 41-28 50-10q27 0 50 10t40 27 28 41 10 50h128q0-53-20-99t-55-82-81-55-100-20z" />
    </svg>
  ),
  displayName: 'EventTentativeMirroredIcon',
});

export default EventTentativeMirroredIcon;
