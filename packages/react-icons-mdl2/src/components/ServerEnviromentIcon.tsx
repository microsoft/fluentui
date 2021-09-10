import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ServerEnviromentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M768 384h512v128H768V384zm0 768h512v128H768v-128zm0 256h512v128H768v-128zm1170 640H110l160-640h242V256q0-26 10-49t27-41 41-28 50-10h768q26 0 49 10t41 27 28 41 10 50v1152h242l160 640zM640 1664h768V256H640v1408zm1134 256l-96-384h-142v256H512v-256H370l-96 384h1500z" />
    </svg>
  ),
  displayName: 'ServerEnviromentIcon',
});

export default ServerEnviromentIcon;
