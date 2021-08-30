import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UnpublishContentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M768 347L365 749l-90-90 557-557 557 557-90 90-403-402v1317H768V347zm1280 1253q0 93-35 174t-96 143-142 96-175 35q-93 0-174-35t-143-96-96-142-35-175q0-93 35-174t96-143 142-96 175-35q93 0 174 35t143 96 96 142 35 175zm-272 267l-443-443q-26 39-39 84t-14 92q0 67 25 125t68 101 102 69 125 25q47 0 92-13t84-40zm144-267q0-66-25-124t-69-101-102-69-124-26q-47 0-92 13t-84 40l443 443q26-39 39-84t14-92zm-835 320q22 37 48 69t59 59H0v-384h128v256h957z" />
    </svg>
  ),
  displayName: 'UnpublishContentIcon',
});

export default UnpublishContentIcon;
