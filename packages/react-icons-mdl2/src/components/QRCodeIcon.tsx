import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const QRCodeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 640V384h256v256H384zM128 896V128h768v768H128zm128-640v512h512V256H256zm128 1408v-256h256v256H384zm-256 256v-768h768v768H128zm128-640v512h512v-512H256zm1408-896v256h-256V384h256zm-512-256h768v768h-768V128zm640 640V256h-512v512h512zm-640 768h128v128h-128v-128zm256-256h-128v128h-128v-256h256v128zm256-128v128h-128v-128h128zm-128 128v256h-256v-128h128v-128h128zm-256 384h256v128h-128v128h-256v-128h128v-128zm256 256v-128h256v128h-256zm384-128h-128v-256h128v256zm-128-512v-128h128v256h-128v128h-128v-256h128zm-256 384v-128h128v128h-128z" />
    </svg>
  ),
  displayName: 'QRCodeIcon',
});

export default QRCodeIcon;
