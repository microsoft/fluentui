import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StorageAcountIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 0h2048v2048H0V0zm1920 1920V512H128v1408h1792zm0-1536V128H128v256h1792zm-128 256v512H256V640h1536zm-128 384V768H384v256h1280zm128 256v512H256v-512h1536zm-128 384v-256H384v256h1280z" />
    </svg>
  ),
  displayName: 'StorageAcountIcon',
});

export default StorageAcountIcon;
