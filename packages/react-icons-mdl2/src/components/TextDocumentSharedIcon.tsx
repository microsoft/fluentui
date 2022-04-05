import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TextDocumentSharedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1408 1024H512V896h896v128zm-896 128h896v56q-41 32-72 72H512v-128zm0 256h756q-20 63-20 128H512v-128zm-256 512h880q-16 61-16 128H128V0h1115l549 549v591q-63-20-128-20V640h-512V128H256v1792zM1280 512h293l-293-293v293zm568 1201q46 25 83 61t63 79 40 93 14 102h-128q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100h-128q0-52 14-101t40-93 63-80 83-61q-34-35-53-81t-19-96q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100q0 50-19 96t-53 81zm-184-49q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10z" />
    </svg>
  ),
  displayName: 'TextDocumentSharedIcon',
});

export default TextDocumentSharedIcon;
