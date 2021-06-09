import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PrimaryCalendarIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2031 1537l-266 197 102 313-267-193-266 194 101-314-266-197h335l97-310 95 310h335zm17-1409v1249h-128V640H128v1152h1116l4 3-41 125H0V128h384V0h128v128h1024V0h128v128h384zm-128 384V256h-256v128h-128V256H512v128H384V256H128v256h1792z" />
    </svg>
  ),
  displayName: 'PrimaryCalendarIcon',
});

export default PrimaryCalendarIcon;
