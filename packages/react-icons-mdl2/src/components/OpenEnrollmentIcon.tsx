import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const OpenEnrollmentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1848 896q42 0 78 15t64 42 42 63 16 78q0 39-15 76t-43 65l-717 719-377 94 94-377 717-718q28-28 65-42t76-15zm51 249q21-21 21-51 0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 694-34 135 135-34 692-693zM640 896H512V768h128v128zm896 0H768V768h768v128zM512 1152h128v128H512v-128zm128-640H512V384h128v128zm896 0H768V384h768v128zM384 1664h443l-32 128H256V0h1536v743q-67 10-128 44V128H384v1536zm384-512h514l-128 128H768v-128z" />
    </svg>
  ),
  displayName: 'OpenEnrollmentIcon',
});

export default OpenEnrollmentIcon;
