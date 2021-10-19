import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CopyEditIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 1920v-260l128-129v517h-515l127-128h260zM1408 896V512H768v1388q0 1-5 22t-12 48-13 50-7 28h-91v-384H128V0h859l384 384h128l355 355q-82 0-153 29l-165-165v165h165q-28 12-49 25t-39 29-36 34-39 40h-130zM640 384h549L933 128H256v1408h384V384zm1408 710q0 39-15 76t-43 65l-717 719-377 94 94-377 717-718q28-28 65-42t76-15q42 0 78 15t64 42 42 63 16 78zm-128 0q0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 694-34 135 135-34 692-693q21-21 21-51z" />
    </svg>
  ),
  displayName: 'CopyEditIcon',
});

export default CopyEditIcon;
