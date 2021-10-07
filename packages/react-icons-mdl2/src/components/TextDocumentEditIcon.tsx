import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TextDocumentEditIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1848 896q42 0 78 15t64 41 42 63 16 79q0 39-15 76t-43 65l-717 717-377 94 94-377 717-716q29-29 65-43t76-14zm72 198q0-32-20-51t-52-19q-14 0-27 4t-23 15l-692 692-34 135 135-34 692-691q21-21 21-51zM256 128v1792h506l-31 128H128V0h1115l549 549v192q-37 5-66 15t-62 31V640h-512V128H256zm1024 91v293h293l-293-293zm128 677v128H512V896h896zm-896 640v-128h513l-128 128H512zm769-384l-128 128H512v-128h769z" />
    </svg>
  ),
  displayName: 'TextDocumentEditIcon',
});

export default TextDocumentEditIcon;
