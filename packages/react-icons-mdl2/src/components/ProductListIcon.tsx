import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ProductListIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 1000v959l-64 32-832-415V536l832-416 832 416v744h-128V680l-640 320zm-64-736L719 384l621 314 245-122-625-312zm-64 1552v-816L256 680v816l640 320zM335 576l625 312 238-118-622-314-241 120zm1073 1216v-128h640v128h-640zm0-384h640v128h-640v-128zm-256 640v-128h128v128h-128zm0-512v-128h128v128h-128zm0 256v-128h128v128h-128zm-128 24h1-1zm384 232v-128h640v128h-640z" />
    </svg>
  ),
  displayName: 'ProductListIcon',
});

export default ProductListIcon;
