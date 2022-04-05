import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AreaChartIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 1792l1664 1v128l-1792-1V129h128v1663zm1664-859v731H384V760l320-160 435 218 333-332 448 447zM704 744l-192 95v441h433l540-270 307 307V987l-320-321-307 308-461-230zm-192 792h1280v-37l-333-333-484 242H512v128z" />
    </svg>
  ),
  displayName: 'AreaChartIcon',
});

export default AreaChartIcon;
