import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const FabricFormLibraryMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 512v451l-128-128V512h-704q-56 0-90 9t-58 24-41 31-37 31-50 23-76 10H128v896h640v128H128q-27 0-50-10t-40-27-28-41-10-50V256q0-27 10-50t27-40 41-28 50-10h736q37 0 69 13t58 36 49 51 39 59q13 23 25 41t28 30 35 19 49 7h704q27 0 50 10t40 27 28 41 10 50zm-1184 0q27 0 45-9t35-22 34-28 39-28q-15-17-31-45t-36-56-40-48-46-20H128v256h736zm32 256h731l421 421v859H896V768zm1024 1152v-640h-384V896h-512v1024h896zm-256-933v165h165l-165-165zm-384 805v-128h512v128h-512zm256-256v-128h256v128h-256z" />
    </svg>
  ),
  displayName: 'FabricFormLibraryMirroredIcon',
});

export default FabricFormLibraryMirroredIcon;
