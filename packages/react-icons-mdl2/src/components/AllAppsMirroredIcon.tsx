import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AllAppsMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1408v-384h-384v384h384zm-128-256v128h-128v-128h128zm128-256V512h-384v384h384zm-128-256v128h-128V640h128zm128-256V0h-384v384h384zm-128-256v128h-128V128h128zm-512 640V640H256v128h1152zm-896 384v128h896v-128H512zm896-1024H0v128h1408V128zm640 1792v-384h-384v384h384zm-128-256v128h-128v-128h128zm-512 128v-128H256v128h1152z" />
    </svg>
  ),
  displayName: 'AllAppsMirroredIcon',
});

export default AllAppsMirroredIcon;
