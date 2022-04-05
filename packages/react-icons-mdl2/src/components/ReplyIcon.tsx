import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReplyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 640q128 0 245 48t208 139q91 91 139 208t48 245q0 133-50 249t-137 204-203 137-250 50v-128q106 0 199-40t162-110 110-163 41-199q0-106-40-199t-110-162-163-110-199-41H475l402 403-90 90-557-557 557-557 90 90-402 403h677z" />
    </svg>
  ),
  displayName: 'ReplyIcon',
});

export default ReplyIcon;
