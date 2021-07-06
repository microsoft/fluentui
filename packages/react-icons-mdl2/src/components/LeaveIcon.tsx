import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LeaveIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2011 960l-446 445-90-90 291-291H768V896h998l-291-291 90-90 446 445zm-859 320h128v640H0V0h1280v640h-128V128H128v1664h1024v-512z" />
    </svg>
  ),
  displayName: 'LeaveIcon',
});

export default LeaveIcon;
