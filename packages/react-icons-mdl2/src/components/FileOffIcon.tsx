import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FileOffIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1085 1920q45 71 107 128H128V0h1115l549 549v477q-31-11-63-17t-65-11V640h-512V128H256v1792h829zm195-1701v293h293l-293-293zm768 1381q0 93-35 174t-96 143-142 96-175 35q-93 0-174-35t-143-96-96-142-35-175q0-93 35-174t96-143 142-96 175-35q93 0 174 35t143 96 96 142 35 175zm-768 0q0 66 25 124t68 102 102 69 125 25q47 0 92-13t84-40l-443-443q-26 39-39 84t-14 92zm587 176q26-39 39-84t14-92q0-66-25-124t-69-101-102-69-124-26q-47 0-92 13t-84 40l443 443z" />
    </svg>
  ),
  displayName: 'FileOffIcon',
});

export default FileOffIcon;
