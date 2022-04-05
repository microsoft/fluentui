import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GridViewSmallIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 128v1664H128V128h1664zm-128 128h-384v384h384V256zm-512 896V768H768v384h384zm-384 128v384h384v-384H768zM640 768H256v384h384V768zm512-128V256H768v384h384zm128 512h384V768h-384v384zM256 256v384h384V256H256zm0 1408h384v-384H256v384zm1408 0v-384h-384v384h384z" />
    </svg>
  ),
  displayName: 'GridViewSmallIcon',
});

export default GridViewSmallIcon;
