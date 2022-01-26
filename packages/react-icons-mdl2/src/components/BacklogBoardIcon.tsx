import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BacklogBoardIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 384h512v384H256V384zm128 256h256V512H384v128zM256 896h512v384H256V896zm128 256h256v-128H384v128zm512-768h512v384H896V384zm128 256h256V512h-256v128zm512-256h512v384h-512V384zm128 256h256V512h-256v128zM896 896h512v384H896V896zm128 256h256v-128h-256v128zm512-256h512v384h-512V896zm128 256h256v-128h-256v128zM256 1408h512v384H256v-384zm128 256h256v-128H384v128zm1152-256h512v384h-512v-384zm128 256h256v-128h-256v128zm384-1536v128H128v1664H0V128h2048z" />
    </svg>
  ),
  displayName: 'BacklogBoardIcon',
});

export default BacklogBoardIcon;
