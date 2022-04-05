import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const FabricUnsyncFolderIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 512v512h-128V512h-704q-56 0-90 9t-58 24-41 31-37 31-50 23-76 10H128v896h896v128H128q-27 0-50-10t-40-27-28-41-10-50V256q0-27 10-50t27-40 41-28 50-10h736q37 0 69 13t58 36 49 51 39 59q13 23 25 41t28 30 35 19 49 7h704q27 0 50 10t40 27 28 41 10 50zm-1184 0q27 0 45-9t35-22 34-28 39-28q-15-17-31-45t-36-56-40-48-46-20H128v256h736zm1056 777v-137h128v384h-384v-128h190q-45-60-112-94t-142-34q-47 0-92 13t-84 40l443 443q36-56 47-123l127 22q-18 106-82 193l89 89-91 91-89-89q-58 44-127 66t-141 23q-91 0-174-35t-146-102v137h-128v-384h384v128h-190q45 60 112 94t142 34q47 0 92-13t84-40l-443-443q-36 56-47 123l-127-22q18-106 82-193l-89-89 91-91 89 89q58-44 127-66t141-23q91 0 174 35t146 102z" />
    </svg>
  ),
  displayName: 'FabricUnsyncFolderIcon',
});

export default FabricUnsyncFolderIcon;
