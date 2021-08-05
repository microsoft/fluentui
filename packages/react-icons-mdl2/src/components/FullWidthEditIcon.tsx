import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FullWidthEditIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 256v540q-58-37-128-51V384h-384v256h-128V384H640v256H512V384H128v1280h384v-128h128v128h128v128H0V256h2048zM640 1024H512V768h128v256zm-128 128h128v256H512v-256zm1024-384v256h-128V768h128zm312 128q42 0 78 15t64 42 42 63 16 78q0 39-15 76t-43 65l-717 719-377 94 94-377 717-718q28-28 65-42t76-15zm51 249q21-21 21-51 0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 694-34 135 135-34 692-693z" />
    </svg>
  ),
  displayName: 'FullWidthEditIcon',
});

export default FullWidthEditIcon;
