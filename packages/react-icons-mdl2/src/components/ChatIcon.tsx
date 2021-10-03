import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChatIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 128h2048v1408H731l-475 475v-475H0V128zm1920 1280V256H128v1152h256v293l293-293h1243z" />
    </svg>
  ),
  displayName: 'ChatIcon',
});

export default ChatIcon;
