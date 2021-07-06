import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const VersionControlPushIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 0v128H256V0h1408zm-640 603v554q83 11 153 50t122 99 80 135 29 159q0 93-35 174t-96 143-142 96-175 35q-93 0-174-35t-143-96-96-142-35-175q0-83 29-158t80-135 121-99 154-51V603L557 941l-90-90 493-493 493 493-90 90-339-338zm256 997q0-66-25-124t-69-101-102-69-124-26q-66 0-124 25t-102 69-69 102-25 124q0 66 25 124t68 102 102 69 125 25q66 0 124-25t101-68 69-102 26-125z" />
    </svg>
  ),
  displayName: 'VersionControlPushIcon',
});

export default VersionControlPushIcon;
