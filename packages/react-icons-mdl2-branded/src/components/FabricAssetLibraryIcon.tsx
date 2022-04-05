import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const FabricAssetLibraryIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 512v512h-128V512h-704q-56 0-90 9t-58 24-41 31-37 31-50 23-76 10H128v896h768v128H128q-27 0-50-10t-40-27-28-41-10-50V256q0-27 10-50t27-40 41-28 50-10h736q37 0 69 13t58 36 49 51 39 59q13 23 25 41t28 30 35 19 49 7h704q27 0 50 10t40 27 28 41 10 50zm-1184 0q27 0 45-9t35-22 34-28 39-28q-15-17-31-45t-36-56-40-48-46-20H128v256h736zm160 1536v-896h1024v896H1024zm128-256v128h768v-128h-128v-128h128v-128h-128v-128h128v-128h-768v128h128v128h-128v128h128v128h-128zM768 768q41 0 79 12t72 34 58 53 42 69l-118 49q-17-41-53-65t-80-24v320q0 44-20 79t-51 61-72 38-81 14q-41 0-81-13t-72-39-51-60-20-80q0-44 19-79t52-61 72-38 81-14q52 0 96 19V768h128zm-224 512q13 0 29-4t32-12 25-20 10-28q0-16-10-28t-25-20-31-12-30-4q-13 0-29 4t-32 12-25 20-10 28q0 16 10 28t25 20 31 12 30 4z" />
    </svg>
  ),
  displayName: 'FabricAssetLibraryIcon',
});

export default FabricAssetLibraryIcon;
