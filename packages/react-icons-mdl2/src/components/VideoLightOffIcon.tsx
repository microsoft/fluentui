import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const VideoLightOffIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 960q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45zm576 192q93 0 174 35t142 96 96 142 36 175q0 93-35 174t-96 142-142 96-175 36q-93 0-174-35t-142-96-96-142-36-175q0-93 35-174t96-142 142-96 175-36zm-320 448q0 66 25 124t68 102 102 69 125 25q47 0 92-13t84-40l-443-443q-26 39-39 84t-14 92zm587 176q26-39 39-84t14-92q0-66-25-124t-69-101-102-69-124-26q-47 0-92 13t-84 40l443 443zm181-1392v808q-57-62-128-107V512h-128v514q-31-11-63-17t-65-11V512h-37l-219 219v295q-34 11-66 25t-62 34V768H128v384h1064q-62 57-107 128H0V640h1317l256-256h475z" />
    </svg>
  ),
  displayName: 'VideoLightOffIcon',
});

export default VideoLightOffIcon;
