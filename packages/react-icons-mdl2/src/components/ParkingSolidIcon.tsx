import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ParkingSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2019 1075q29 64 29 133v72q0 38-10 73t-30 65-48 54-62 40q-15 35-39 63t-55 47-66 31-74 11q-69 0-128-34t-94-94H734q-35 60-94 94t-128 34q-69 0-128-34t-94-94H128q-27 0-50-10t-40-27-28-41-10-50v-256q0-79 30-149t82-122 122-83 150-30h37l328-328q27-27 62-41t74-15h907v128h-29l256 563zM512 1536q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10zm640-1024H885q-26 0-45 19L603 768h549V512zm128 256h459l-99-219q-8-17-24-27t-35-10h-301v256zm384 768q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10z" />
    </svg>
  ),
  displayName: 'ParkingSolidIcon',
});

export default ParkingSolidIcon;
