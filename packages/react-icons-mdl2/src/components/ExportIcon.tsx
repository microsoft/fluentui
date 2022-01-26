import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ExportIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1497 589l308 309H262v128h1540l-305 305 90 90 461-461-461-461-90 90zM134 512H6v896h128V512z" />
    </svg>
  ),
  displayName: 'ExportIcon',
});

export default ExportIcon;
