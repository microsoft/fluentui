import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FullViewIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 1664v-384h128v512h-512v-128h384zM1280 256h512v512h-128V384h-384V256zM256 768V256h512v128H384v384H256zm128 512v384h384v128H256v-512h128z" />
    </svg>
  ),
  displayName: 'FullViewIcon',
});

export default FullViewIcon;
