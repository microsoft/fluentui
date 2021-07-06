import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TripleColumnEditIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 898l-128 128V256h512v490q-18-3-36-5t-36-2q-14 0-28 1t-28 4V384h-256v514zm-640 641l-128 157V256h512v898l-128 128V384H896v1155zM128 256h512v1536H128V256zm128 1408h256V384H256v1280zm1592-768q42 0 78 15t64 42 42 63 16 78q0 39-15 76t-43 65l-717 719-377 94 94-377 717-718q28-28 65-42t76-15zm51 249q21-21 21-51 0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 694-34 135 135-34 692-693z" />
    </svg>
  ),
  displayName: 'TripleColumnEditIcon',
});

export default TripleColumnEditIcon;
