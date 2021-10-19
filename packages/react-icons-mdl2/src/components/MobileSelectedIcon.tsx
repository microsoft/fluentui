import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MobileSelectedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1073 1664l-57 56 72 72H832v-128h241zm143 256l128 128H512q-27 0-50-10t-40-27-28-41-10-50V128q0-27 10-50t27-40 41-28 50-10h1024q27 0 50 10t40 27 28 41 10 50v1264l-128 128V128H512v1792h704zm813-482l-557 557-269-269 90-91 179 179 467-467 90 91z" />
    </svg>
  ),
  displayName: 'MobileSelectedIcon',
});

export default MobileSelectedIcon;
