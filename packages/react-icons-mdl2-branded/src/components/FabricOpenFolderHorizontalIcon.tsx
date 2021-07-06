import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const FabricOpenFolderHorizontalIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2005 896q0 32-15 60l-340 639q-17 32-47 50t-67 19H128q-26 0-49-10t-41-27-28-41-10-50V256q0-27 10-50t27-40 41-28 50-10h608q37 0 69 13t58 36 49 51 39 59q13 23 25 41t28 30 35 19 49 7h576q27 0 50 10t40 27 28 41 10 50v256h28q14 0 29-1 42 0 77 10t61 53q18 30 18 66zM128 256v1073l245-490q17-33 47-52t68-19h1176V512h-576q-62 0-104-19t-73-47-51-62-39-61-38-48-47-19H128zm1408 1280l341-640H488l-320 640h1368z" />
    </svg>
  ),
  displayName: 'FabricOpenFolderHorizontalIcon',
});

export default FabricOpenFolderHorizontalIcon;
