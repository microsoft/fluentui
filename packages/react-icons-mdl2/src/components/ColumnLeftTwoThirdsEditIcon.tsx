import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ColumnLeftTwoThirdsEditIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 1664h699l-32 128H0V256h1280v898l-128 128V384H128v1280zM2048 256v540q-29-19-61-31t-67-19V384h-384v514l-128 128V256h640zm-200 640q42 0 78 15t64 42 42 63 16 78q0 39-15 76t-43 65l-717 719-377 94 94-377 717-718q28-28 65-42t76-15zm51 249q21-21 21-51 0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 694-34 135 135-34 692-693z" />
    </svg>
  ),
  displayName: 'ColumnLeftTwoThirdsEditIcon',
});

export default ColumnLeftTwoThirdsEditIcon;
