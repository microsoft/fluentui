import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HardDriveLockIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1728 512q66 0 124 25t101 69 69 102 26 124v292q-20-50-53-93t-75-76V832q0-40-15-75t-41-61-61-41-75-15H320q-40 0-75 15t-61 41-41 61-15 75v320h1152v128H0V832q0-66 25-124t68-101 102-69 125-26h1408zm64 256v128h-128V768h128zm-256 128h-128V768h128v128zm128 128q53 0 99 20t82 55 55 81 20 100v128h128v640h-768v-640h130v-128q1-53 20-99t54-82 80-55 100-20zm-128 384h256v-128q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50v128zm384 128h-512v384h512v-384z" />
    </svg>
  ),
  displayName: 'HardDriveLockIcon',
});

export default HardDriveLockIcon;
