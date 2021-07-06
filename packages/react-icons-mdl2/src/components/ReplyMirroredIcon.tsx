import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReplyMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M870 640q-128 0-245 48T417 827q-91 91-139 208t-48 245q0 133 50 249t137 204 203 137 250 50v-128q-106 0-199-40t-162-110-110-163-41-199q0-106 40-199t110-162 163-110 199-41h677l-402 403 90 90 557-557-557-557-90 90 402 403H870z" />
    </svg>
  ),
  displayName: 'ReplyMirroredIcon',
});

export default ReplyMirroredIcon;
