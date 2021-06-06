import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HardDriveGroupIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 1536h-128v-128h128v128zm-256 0h-128v-128h128v128zm256-512h-128V896h128v128zm-256 0h-128V896h128v128zm320-896q40 0 75 15t61 41 41 61 15 75v1472H128V320q0-40 15-75t41-61 61-41 75-15h1408zm64 1152H256v384h1536v-384zm0-512H256v384h1536V768zm0-128V320q0-26-19-45t-45-19H320q-26 0-45 19t-19 45v320h1536zm-256-256h128v128h-128V384zm-256 0h128v128h-128V384z" />
    </svg>
  ),
  displayName: 'HardDriveGroupIcon',
});

export default HardDriveGroupIcon;
