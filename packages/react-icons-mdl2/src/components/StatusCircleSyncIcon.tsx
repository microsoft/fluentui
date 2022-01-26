import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StatusCircleSyncIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1408 640v384h-384V896h190q-45-60-112-94t-142-34q-59 0-111 20t-95 55-70 85-38 107l-127-22q14-81 54-149t98-118 133-78 156-28q91 0 174 35t146 102V640h128zm-448 768q58 0 111-20t95-55 70-85 38-107l127 22q-14 81-54 149t-98 118-133 78-156 28q-91 0-174-35t-146-102v137H512v-384h384v128H706q45 60 112 94t142 34z" />
    </svg>
  ),
  displayName: 'StatusCircleSyncIcon',
});

export default StatusCircleSyncIcon;
