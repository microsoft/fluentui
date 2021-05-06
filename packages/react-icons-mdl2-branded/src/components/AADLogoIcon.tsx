import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const AADLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 1310l-1024 598L0 1310 1024 140l1024 1170zm-526 60q30 0 57-11t46-31 31-47 12-57q0-30-11-56t-32-46-46-31-57-12q-32 0-62 14l-314-359q23-35 23-79 0-30-11-56t-31-46-46-31-57-12q-30 0-56 11t-47 31-31 46-12 57q0 21 6 41t18 38l-314 359q-30-14-62-14-30 0-56 11t-47 31-31 46-12 57q0 30 11 57t31 46 47 31 57 12q28 0 54-10t46-31l257 150q-5 20-5 36 0 30 11 56t32 47 46 31 57 12q30 0 56-11t47-32 31-46 12-57q0-16-5-36l256-150q20 20 46 30t55 11zM962 787l10 4q5 2 12 4v580q-35 11-61 35l-257-150q5-20 5-36 0-44-23-79l314-358zm438 358q-23 35-23 79 0 20 4 36l-256 150q-26-24-61-35V795q6-2 11-4t11-4l314 358z" />
    </svg>
  ),
  displayName: 'AADLogoIcon',
});

export default AADLogoIcon;
