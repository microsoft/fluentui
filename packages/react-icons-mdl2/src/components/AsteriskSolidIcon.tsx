import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AsteriskSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1280 1024l695 401-128 222-695-401v802H896v-802l-695 401-128-222 695-401L73 623l128-222 695 401V0h256v802l695-401 128 222-695 401z" />
    </svg>
  ),
  displayName: 'AsteriskSolidIcon',
});

export default AsteriskSolidIcon;
