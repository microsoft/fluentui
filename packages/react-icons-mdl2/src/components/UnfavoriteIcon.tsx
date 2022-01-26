import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UnfavoriteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1609 992q-125 0-234 44t-192 122-133 186-56 235l-610 469 248-794L0 768h784L1024 0l240 768h784l-313 240q-31-7-62-11t-64-5zm-9 160q93 0 174 35t142 96 96 142 36 175q0 93-35 174t-96 142-142 96-175 36q-93 0-174-35t-142-96-96-142-36-175q0-93 35-174t96-142 142-96 175-36zm-320 448q0 66 25 124t69 101 102 69 124 26q47 0 92-13t84-40l-443-443q-26 39-39 84t-14 92zm587 176q26-39 39-84t14-92q0-66-25-124t-69-101-102-69-124-26q-47 0-92 13t-84 40l443 443z" />
    </svg>
  ),
  displayName: 'UnfavoriteIcon',
});

export default UnfavoriteIcon;
