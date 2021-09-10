import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RepeatHeaderRowsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 384h1408v1664H640V384zm1280 1536V512H768v1408h1152zM128 128v1408h384v128H0V0h1408v256h-128V128H128zm128 128h256v384H384v640h128v128H256V256zm1536 1536H896V640h896v1152zm-512-768h-256v256h256v-256zm-256 640h256v-256h-256v256zm640 0v-256h-256v256h256zm0-384v-256h-256v256h256z" />
    </svg>
  ),
  displayName: 'RepeatHeaderRowsIcon',
});

export default RepeatHeaderRowsIcon;
