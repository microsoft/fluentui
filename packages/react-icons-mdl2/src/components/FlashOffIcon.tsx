import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FlashOffIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1472 1152q93 0 174 35t142 96 96 142 36 175q0 93-35 174t-96 142-142 96-175 36q-93 0-174-35t-142-96-96-142-36-175q0-93 35-174t96-142 142-96 175-36zm-320 448q0 66 25 124t68 102 102 69 125 25q47 0 92-13t84-40l-443-443q-26 39-39 84t-14 92zm587 176q26-39 39-84t14-92q0-66-25-124t-69-101-102-69-124-26q-47 0-92 13t-84 40l443 443zm-723-880l384-768H967L455 1152h449l-384 768h29l347-347v182l-293 293H313l384-768H248L888 0h719l-384 768h660l-256 256h-182l128-128h-557z" />
    </svg>
  ),
  displayName: 'FlashOffIcon',
});

export default FlashOffIcon;
