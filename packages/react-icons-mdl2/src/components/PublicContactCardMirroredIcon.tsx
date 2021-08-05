import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PublicContactCardMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 896h640V768H256v128zm640 256H512v128h384v-128zm326-80q-46 26-82 62t-62 79-40 93-14 102h128q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100h128q0-52-14-101t-39-93-62-80-83-62q33-35 51-81t19-95q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100q0 49 18 95t52 81zm314-176q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10q27 0 50 10t40 27 28 41 10 50zM319 1411L2 1728l317 317 91-90-163-163h658l-163 163 91 90 317-317-317-317-91 90 163 163H247l163-163-91-90zM0 256v1216l128-128V384h1792v1280h-640v128h768V256H0z" />
    </svg>
  ),
  displayName: 'PublicContactCardMirroredIcon',
});

export default PublicContactCardMirroredIcon;
