import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const ProjectDocumentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M457 879q50 0 82 21t33 77q0 56-31 78t-84 23h-57V879h57zM1459 0l589 589v1459H384v-336L0 1651V512l384-55V0h1075zM400 1187h69q49 0 95-13t82-39 56-67 22-96q0-57-18-96t-51-63-76-34-97-11H256v640h144v-221zm1520 733V768h-128v1024h-768v-128h640v-128h-512v-256h512V768h-640V640h256V128H512v311l384-55v1408l-384-60v188h1408zm0-1280l-512-512v512h512zm-384 256v256h-512V896h512z" />
    </svg>
  ),
  displayName: 'ProjectDocumentIcon',
});

export default ProjectDocumentIcon;
