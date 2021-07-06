import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const F12DevToolsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 256v1280h-86l-128-128h86V384H128v1024h512v128H0V256h2048zm-267 1280h-576q-218 219-437 437V523l1013 1013zm-309-128L896 832v832l256-256h320z" />
    </svg>
  ),
  displayName: 'F12DevToolsIcon',
});

export default F12DevToolsIcon;
