import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UnsyncFolderIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 0q27 0 50 10t40 27 28 41 10 50v992q0 31 9 54t24 44 31 41 31 45 23 58 10 78v480q0 27-10 50t-27 40-41 28-50 10H960l128-128h448v-480q0-45 9-77t24-58 31-46 31-40 23-44 10-55V128H384v870q-32 4-64 10t-64 18V0h1408zm128 1440q0-24-4-42t-13-33-20-29-27-32q-15 17-26 31t-20 30-13 33-5 42v480h128v-480zM768 1152h128v384H512v-128h190q-45-60-112-94t-142-34q-47 0-92 13t-84 40l443 443q36-56 47-123l127 22q-9 53-30 101t-53 92l87 87-90 90-87-86q-58 43-127 66t-141 23q-91 0-174-35t-146-102v137H0v-384h384v128H194q45 60 112 94t142 34q47 0 92-13t84-40l-443-443q-36 56-47 123L7 1525q9-53 30-101t53-92l-87-87 90-90 87 86q58-43 127-66t141-23q91 0 174 35t146 102v-137z" />
    </svg>
  ),
  displayName: 'UnsyncFolderIcon',
});

export default UnsyncFolderIcon;
