import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PlugDisconnectedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1300 1201l-271 271 90 90-226 227q-63 63-145 97t-172 34q-73 0-141-22t-127-67l-199 198-90-90 198-199q-44-58-66-126t-23-142q0-89 34-171t97-146l227-226 90 90 271-271 91 90-272 272 272 272 272-272 90 91zm-724 591q64 0 122-24t104-70l136-136-452-452-136 136q-45 45-69 103t-25 123q0 66 25 124t68 102 102 69 125 25zM1831 308q44 58 66 126t23 142q0 89-34 171t-97 146l-227 226-633-633 226-227q63-63 145-97t172-34q73 0 141 22t127 67l199-198 90 90-198 199zm-133 494q45-45 69-103t25-123q0-66-25-124t-69-101-102-69-124-26q-64 0-122 24t-104 70l-136 136 452 452 136-136z" />
    </svg>
  ),
  displayName: 'PlugDisconnectedIcon',
});

export default PlugDisconnectedIcon;
