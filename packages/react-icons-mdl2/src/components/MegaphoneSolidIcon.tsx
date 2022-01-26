import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MegaphoneSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 448q6-1 16-1t22-1q24 0 50 1t40 1v1152h-39q-25 0-49 1h-30q-13 0-21-2l-763-136q-10 57-38 106t-71 84-94 55-111 20q-66 0-124-25t-102-68-69-102-25-125q0-28 6-57l-396-71q-8-1-17-1t-21-1q-22 0-44 1t-40 1V768q14 0 38 1t48 1h20q9 0 16-2l1798-320zM832 1600q35 0 67-12t57-33 42-51 23-64l-378-67q-3 18-3 35 0 40 15 75t41 61 61 41 75 15z" />
    </svg>
  ),
  displayName: 'MegaphoneSolidIcon',
});

export default MegaphoneSolidIcon;
