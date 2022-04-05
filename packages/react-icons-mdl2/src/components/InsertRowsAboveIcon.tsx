import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const InsertRowsAboveIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1664H0V128h512L384 256H128v384h640v512h384V640h768V256h-384l-128-128h640zM640 1280H128v384h512v-384zm640 0H768v384h512v-384zm640 0h-512v384h512v-384zM621 525l-90-90L960 6l429 429-90 90-275-275v774H896V250L621 525z" />
    </svg>
  ),
  displayName: 'InsertRowsAboveIcon',
});

export default InsertRowsAboveIcon;
