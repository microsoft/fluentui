import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChatSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1408H704l-448 448v-448H0V128h2048z" />
    </svg>
  ),
  displayName: 'ChatSolidIcon',
});

export default ChatSolidIcon;
