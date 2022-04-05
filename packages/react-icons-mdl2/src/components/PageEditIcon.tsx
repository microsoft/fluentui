import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PageEditIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1848 896q42 0 78 15t64 42 42 63 16 78q0 39-15 76t-43 65l-717 719-377 94 94-377 717-718q28-28 65-42t76-15zm51 249q21-21 21-51 0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 694-34 135 135-34 692-693zM256 1920h507l-32 128H128V0h1115l549 549v194q-67 10-128 44V640h-512V128H256v1792zM1280 512h293l-293-293v293z" />
    </svg>
  ),
  displayName: 'PageEditIcon',
});

export default PageEditIcon;
