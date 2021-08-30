import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EventDeclinedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1152h-128V640H128v1152h1152v128H0V128h384V0h128v128h1024V0h128v128h384zm-128 384V256h-256v128h-128V256H512v128H384V256H128v256h1792zm125 990l-226 226 226 227-90 90-227-226-227 227-90-91 227-227-227-227 90-90 227 227 227-227 90 91z" />
    </svg>
  ),
  displayName: 'EventDeclinedIcon',
});

export default EventDeclinedIcon;
