import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DiagnosticIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 128v1792H128V128h1792zM256 256v1024h150l109-109q19-19 45-19t45 19l177 176 244-947q5-21 22-34t40-14q23 0 40 13t22 36l102 417h156q22 0 39 13t23 35l72 286h250V256H256zm1536 1536v-512h-300q-23 0-40-13t-22-36l-72-285h-156q-23 0-40-13t-22-36l-54-218-208 809q-5 21-22 34t-40 14q-26 0-45-19l-211-211-83 83q-19 19-45 19H256v384h1536z" />
    </svg>
  ),
  displayName: 'DiagnosticIcon',
});

export default DiagnosticIcon;
