import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const WinesIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 704q0 110-39 208t-108 175-162 127-203 63v643h192q26 0 45 19t19 45q0 26-19 45t-45 19H704q-26 0-45-19t-19-45q0-26 19-45t45-19h192v-643q-109-13-202-63t-163-126-108-175-39-209q0-88 14-172t43-169L562 0h796l121 363q28 84 42 168t15 173zm-1024 0q0 93 35 174t96 142 142 96 175 36q93 0 174-35t142-96 96-142 36-175q0-76-13-149t-34-144-46-141-49-142H654l-92 277q-24 73-37 147t-13 152z" />
    </svg>
  ),
  displayName: 'WinesIcon',
});

export default WinesIcon;
