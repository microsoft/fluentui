import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DoubleColumnEditIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 1282l-128 129V256h896v490q-18-3-36-5t-36-2q-14 0-28 1t-28 4V384h-640v898zm-256 257l-50 51-51 202H0V256h896v1283zM768 384H128v1280h640V384zm1080 512q42 0 78 15t64 42 42 63 16 78q0 39-15 76t-43 65l-717 719-377 94 94-377 717-718q28-28 65-42t76-15zm51 249q21-21 21-51 0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 694-34 135 135-34 692-693z" />
    </svg>
  ),
  displayName: 'DoubleColumnEditIcon',
});

export default DoubleColumnEditIcon;
