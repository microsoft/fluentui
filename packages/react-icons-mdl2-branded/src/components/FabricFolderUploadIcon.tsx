import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const FabricFolderUploadIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 512v512h-128V512h-704q-47 0-77 6t-51 16-36 22-30 26-34 26-48 23q-17 6-38 7t-38 2H128v896h1408v128H128q-27 0-50-10t-40-27-28-41-10-50V256q0-27 10-50t27-40 41-28 50-10h736q37 0 68 13t59 36 49 51 39 59q13 23 25 40t28 31 36 19 48 7h704q27 0 50 10t40 27 28 41 10 50zm-1031-87q-15-16-31-44t-35-56-40-48-47-21H128v256h736q27 0 46-9t36-23 33-29 38-26zm391 892l320-319 320 319-91 91-165-165v677h-128v-677l-165 165-91-91z" />
    </svg>
  ),
  displayName: 'FabricFolderUploadIcon',
});

export default FabricFolderUploadIcon;
