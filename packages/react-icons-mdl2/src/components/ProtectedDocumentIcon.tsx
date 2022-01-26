import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ProtectedDocumentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1280v768h-896v-768h128q0-76 17-145t56-123 99-84 148-32q87 0 147 31t99 85 56 122 18 146h128zm-640 0h384v-64q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75v64zm512 128h-640v512h640v-512zM384 1920h512v128H256V293L549 0h1243v860q-29-26-61-47t-67-37V128H603L384 347v1573z" />
    </svg>
  ),
  displayName: 'ProtectedDocumentIcon',
});

export default ProtectedDocumentIcon;
