import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ContextMenuIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 128v1664H256V128h1536zm-128 128H384v1408h1280V256zm-256 768H640V896h768v128zm0 384H640v-128h768v128zm0-768H640V512h768v128z" />
    </svg>
  ),
  displayName: 'ContextMenuIcon',
});

export default ContextMenuIcon;
