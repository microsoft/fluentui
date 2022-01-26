import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const NotExecutedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 1674l388-271q-15 44-23 89t-11 91l-482 337V128l1278 897q-46-15-93-24t-97-9q-17 0-33 2t-34 5L640 374v1300zm960-522q93 0 174 35t143 96 96 142 35 175q0 93-35 174t-96 143-142 96-175 35q-93 0-174-35t-143-96-96-142-35-175q0-93 35-174t96-143 142-96 175-35zm-320 448q0 66 25 124t68 102 102 69 125 25q47 0 92-13t84-40l-443-443q-26 39-39 84t-14 92zm587 176q26-39 39-84t14-92q0-66-25-124t-69-101-102-69-124-26q-47 0-92 13t-84 40l443 443z" />
    </svg>
  ),
  displayName: 'NotExecutedIcon',
});

export default NotExecutedIcon;
