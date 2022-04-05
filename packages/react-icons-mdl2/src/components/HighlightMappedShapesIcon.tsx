import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HighlightMappedShapesIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 640v640h-896v-256H979l-339 226v158h384v640H128v-640h384v-158L77 960l435-290V512H384q-53 0-99-20t-82-55-55-81-20-100q0-53 20-99t55-82 81-55T384 0h384q53 0 99 20t82 55 55 81 20 100q0 53-20 99t-55 82-81 55-100 20H640v158l339 226h173V640h896zM768 384q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10H384q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10h384zM384 1664v128h384v-128H384zm461-704L576 781 307 960l269 179 269-179zm947-64h-384v128h384V896z" />
    </svg>
  ),
  displayName: 'HighlightMappedShapesIcon',
});

export default HighlightMappedShapesIcon;
