import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MessageFillIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1408H731l-475 475v-475H0V128h2048z" />
    </svg>
  ),
  displayName: 'MessageFillIcon',
});

export default MessageFillIcon;
