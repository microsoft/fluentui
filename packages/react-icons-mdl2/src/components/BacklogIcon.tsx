import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BacklogIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 256h512v384H128V256zm128 256h256V384H256v128zM128 768h512v384H128V768zm128 256h256V896H256v128zm512-768h512v384H768V256zm128 256h256V384H896v128zm1024-256v384h-512V256h512zm-128 128h-256v128h256V384zM768 768h512v384H768V768zm128 256h256V896H896v128zm-768 256h512v384H128v-384zm128 256h256v-128H256v128z" />
    </svg>
  ),
  displayName: 'BacklogIcon',
});

export default BacklogIcon;
