import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PageHeaderEditIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 128v1792h640q-10 32-19 64t-17 64H0V0h1792v741q-35 5-66 16t-62 30V128H128zm1921 966q0 39-15 76t-43 65l-717 717-377 94 94-377 717-716q29-29 64-43t77-14q42 0 78 15t64 41 42 63 16 79zm-128 0q0-32-20-51t-52-19q-14 0-27 4t-23 15l-692 692-34 135 135-34 692-691q21-21 21-51zm-385-198H256V258h1280v638zM384 384v384h1024V384H384zm0 1152h514l-25 25q-12 12-27 26-5 20-9 39t-10 38H256v-640h1154l-129 128H384v384z" />
    </svg>
  ),
  displayName: 'PageHeaderEditIcon',
});

export default PageHeaderEditIcon;
