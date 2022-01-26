import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PinIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 512v896h-64q-78 0-143-33t-112-95h-494q-28 59-70 106t-94 81-113 51-126 18h-64v-512H128L0 960l128-64h640V384h64q65 0 125 18t113 51 95 80 70 107h494q47-61 112-94t143-34h64zm-128 139q-24 8-41 20t-30 26-25 33-24 38h-653l-15-43q-28-79-91-134t-145-72v882q82-17 145-72t91-134l15-43h653q12 20 23 38t25 32 31 27 41 20V651z" />
    </svg>
  ),
  displayName: 'PinIcon',
});

export default PinIcon;
