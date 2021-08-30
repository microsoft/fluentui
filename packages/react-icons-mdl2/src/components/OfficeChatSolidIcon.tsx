import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const OfficeChatSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 128v512H640v859l-384 384v-475H0V128h1792zM768 768h1280v896h-256v347l-347-347H768V768z" />
    </svg>
  ),
  displayName: 'OfficeChatSolidIcon',
});

export default OfficeChatSolidIcon;
