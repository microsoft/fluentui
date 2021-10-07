import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReplyAltIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 896v128H475l402 403-90 90-557-557 557-557 90 90-402 403h1445z" />
    </svg>
  ),
  displayName: 'ReplyAltIcon',
});

export default ReplyAltIcon;
