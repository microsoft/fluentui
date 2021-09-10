import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UnknownSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 0q132 0 255 34t229 97 194 150 150 194 97 230 35 255q0 132-34 255t-97 229-150 194-194 150-230 97-255 35q-132 0-255-34t-229-97-194-150-150-194-97-229T0 960q0-132 34-255t97-229 150-194 194-150 229-97T960 0zm64 1408H896v128h128v-128zm8-169q0-37 7-70t36-62q39-39 77-74t68-75 49-85 19-105q0-68-26-127t-70-104-104-71-128-26q-68 0-127 26t-104 70-71 104-26 128h144q0-38 14-71t40-59 58-39 72-15q38 0 71 14t59 40 39 58 15 72q0 41-19 73t-47 61-62 60-61 66-48 81-19 107v64h144v-41z" />
    </svg>
  ),
  displayName: 'UnknownSolidIcon',
});

export default UnknownSolidIcon;
