import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UnknownMirroredSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 0Q828 0 705 34t-229 97-194 150-150 194-97 230T0 960q0 132 34 255t97 229 150 194 194 150 230 97 255 35q132 0 255-34t229-97 194-150 150-194 97-229 35-256q0-132-34-255t-97-229-150-194-194-150-229-97T960 0zm-64 1408h128v128H896v-128zm-8-169q0-37-7-70t-36-62q-39-39-77-74t-68-75-49-85-19-105q0-68 26-127t70-104 104-71 128-26q68 0 127 26t104 70 71 104 26 128h-144q0-38-14-71t-40-59-58-39-72-15q-38 0-71 14t-59 40-39 58-15 72q0 41 19 73t47 61 62 60 61 66 48 81 19 107v64H888v-41z" />
    </svg>
  ),
  displayName: 'UnknownMirroredSolidIcon',
});

export default UnknownMirroredSolidIcon;
