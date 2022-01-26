import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UneditableMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M576 1152q93 0 174 35t143 96 96 142 35 175q0 93-35 174t-96 143-142 96-175 35q-93 0-174-35t-143-96-96-142-35-175q0-93 35-174t96-143 142-96 175-35zm-320 448q0 66 25 124t68 102 102 69 125 25q47 0 92-13t84-40l-443-443q-26 39-39 84t-14 92zm587 176q26-39 39-84t14-92q0-66-25-124t-69-101-102-69-124-26q-47 0-92 13t-84 40l443 443zm1205 272l-633-158-263-263v-182l276 277q16-52 44-98t67-85 84-66 99-45L640 347 347 640l384 384H549L98 573q-48-48-73-109T0 336q0-70 26-131T98 99t107-72T335 0q67 0 128 25t110 73l1304 1305 13 12 158 633zM549 256q-25-25-47-48t-46-41-54-28-67-11q-43 0-80 16t-66 45-44 66-17 81q0 38 10 66t29 53 41 47 48 47l293-293zm1323 1616l-82-329q-47 10-87 32t-73 55-55 73-32 87l329 82z" />
    </svg>
  ),
  displayName: 'UneditableMirroredIcon',
});

export default UneditableMirroredIcon;
