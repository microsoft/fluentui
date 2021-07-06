import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LowerBrightnessIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 512q93 0 174 35t143 96 96 142 35 175q0 93-35 174t-96 143-142 96-175 35q-93 0-174-35t-143-96-96-142-35-175q0-93 35-174t96-143 142-96 175-35zm0 768q66 0 124-25t101-68 69-102 26-125q0-66-25-124t-69-101-102-69-124-26q-66 0-124 25t-102 69-69 102-25 124q0 66 25 124t68 102 102 69 125 25zm64-896H896V192h128v192zM507 598L372 462l90-90 136 135-91 91zm-123 426H192V896h192v128zm123 298l91 91-136 135-90-90 135-136zm389 214h128v192H896v-192zm517-214l135 136-90 90-136-135 91-91zm315-426v128h-192V896h192zm-315-298l-91-91 136-135 90 90-135 136z" />
    </svg>
  ),
  displayName: 'LowerBrightnessIcon',
});

export default LowerBrightnessIcon;
