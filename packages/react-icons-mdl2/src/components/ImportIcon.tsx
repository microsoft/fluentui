import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ImportIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M557 589L249 898h1543v128H252l305 305-90 90L6 960l461-461 90 90zm1363-77h128v896h-128V512z" />
    </svg>
  ),
  displayName: 'ImportIcon',
});

export default ImportIcon;
