import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MicOffIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M704 1536q-40 0-75-15t-61-41-41-61-15-75V192q0-40 15-75t41-61 61-41 75-15h512q40 0 75 15t61 41 41 61 15 75v834q-34 11-66 25t-62 34V192q0-26-19-45t-45-19H704q-26 0-45 19t-19 45v1152q0 26 19 45t45 19h322q-2 2-2 20t-1 41 0 42 1 25H704zm896-384q93 0 174 35t143 96 96 142 35 175q0 93-35 174t-96 143-142 96-175 35q-93 0-174-35t-143-96-96-142-35-175q0-93 35-174t96-143 142-96 175-35zm-320 448q0 66 25 124t68 102 102 69 125 25q47 0 92-13t84-40l-443-443q-26 39-39 84t-14 92zm587 176q26-39 39-84t14-92q0-66-25-124t-69-101-102-69-124-26q-47 0-92 13t-84 40l443 443zm-782 144q45 71 107 128H640v-128h256v-128H662q-84 0-158-32t-129-87-87-129-32-158v-362h128v362q0 57 22 108t59 88 89 60 108 22h362v256h61z" />
    </svg>
  ),
  displayName: 'MicOffIcon',
});

export default MicOffIcon;
