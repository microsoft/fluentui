import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const OfficeChatIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 1280v293l256-256v182l-384 384v-475H0V128h1792v512h-128V256H128v1024h256zm384-512h1280v896h-256v347l-347-347H768V768zm1152 768V896H896v640h603l165 165v-165h256z" />
    </svg>
  ),
  displayName: 'OfficeChatIcon',
});

export default OfficeChatIcon;
