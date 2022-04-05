import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MiniContractIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 1280h128v512H128V256h768v128H256v768h768v512h768v-384zm-1536 0v384h640v-384H256zm1536-256h-640V384h128v421l549-549 91 91-549 549h421v128z" />
    </svg>
  ),
  displayName: 'MiniContractIcon',
});

export default MiniContractIcon;
