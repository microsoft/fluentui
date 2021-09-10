import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CalendarDayIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 128h384v1792H0V128h384V0h128v128h1024V0h128v128zm256 1664V640H128v1152h1792zm0-1280V256h-256v128h-128V256H512v128H384V256H128v256h1792zm-256 512v640H384v-640h1280zm-128 512v-384H512v384h1024zm128-768v128H384V768h1280z" />
    </svg>
  ),
  displayName: 'CalendarDayIcon',
});

export default CalendarDayIcon;
