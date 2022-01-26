import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RegistryEditorIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 896h512v1152H0V384h1152v512zM640 512v384h384V512H640zm384 896v-384H640v384h384zM128 512v384h384V512H128zm0 512v384h384v-384H128zm384 896v-384H128v384h384zm512 0v-384H640v384h384zm512 0v-384h-384v384h384zm-384-512h384v-384h-384v384zm832-960l-384 384-384-384 384-384 384 384zm-384-239l-239 239 239 239 239-239-239-239z" />
    </svg>
  ),
  displayName: 'RegistryEditorIcon',
});

export default RegistryEditorIcon;
