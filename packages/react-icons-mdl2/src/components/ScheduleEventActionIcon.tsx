import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ScheduleEventActionIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 128h384v512H128v1152h896v128H0V128h384V0h128v128h1024V0h128v128zm256 384V256h-256v128h-128V256H512v128H384V256H128v256h1792zm97 256l-238 384h269l-672 896h-264l256-512h-256l387-768h518zm-225 512h-243l238-384h-209l-258 512h256l-241 482 457-610z" />
    </svg>
  ),
  displayName: 'ScheduleEventActionIcon',
});

export default ScheduleEventActionIcon;
