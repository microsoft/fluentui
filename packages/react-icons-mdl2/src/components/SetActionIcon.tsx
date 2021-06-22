import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SetActionIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 0v128H0V0h1664zm-649 512l-67 128H0V512h1015zM0 1024h747l-67 128H0v-128zm1512 0h568L1004 2048H747l304-640H691l535-1024h612l-326 640zm-559 896l807-768h-456l325-640h-325l-402 768h351l-304 640h4z" />
    </svg>
  ),
  displayName: 'SetActionIcon',
});

export default SetActionIcon;
