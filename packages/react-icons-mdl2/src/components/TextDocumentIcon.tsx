import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TextDocumentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1243 0l549 549v1499H128V0h1115zm37 219v293h293l-293-293zM256 1920h1408V640h-512V128H256v1792zm256-896V896h896v128H512zm0 256v-128h896v128H512zm0 256v-128h896v128H512z" />
    </svg>
  ),
  displayName: 'TextDocumentIcon',
});

export default TextDocumentIcon;
