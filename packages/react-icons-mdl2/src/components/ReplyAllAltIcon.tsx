import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReplyAllAltIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 896v128H859l402 403-90 90-557-557 557-557 90 90-402 403h1061zM749 493L282 960l467 467-90 90-557-557 557-557 90 90z" />
    </svg>
  ),
  displayName: 'ReplyAllAltIcon',
});

export default ReplyAllAltIcon;
