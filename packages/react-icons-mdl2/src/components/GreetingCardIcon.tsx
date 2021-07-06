import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GreetingCardIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 384v1664H256V401L1408 41v343h256zm-384-169L739 384h541V215zm256 297H384v1408h1152V512zM960 902q37-34 83-52t98-18q55 0 104 21t85 57 57 85 21 105q0 53-20 102t-58 87l-370 369-370-369q-38-38-58-87t-20-102q0-56 21-105t57-85 84-57 105-21q51 0 97 18t84 52zm279 296q41-41 41-98 0-29-11-54t-30-45-44-30-55-11q-57 0-98 41l-82 82-82-82q-41-41-98-41-29 0-54 11t-45 30-30 44-11 55q0 57 41 98l279 279 279-279z" />
    </svg>
  ),
  displayName: 'GreetingCardIcon',
});

export default GreetingCardIcon;
