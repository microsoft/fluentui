import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const OneNoteLogo16Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1920 0q26 0 49 10t41 27 28 41 10 50v1792q0 26-10 49t-27 41-41 28-50 10H512q-26 0-49-10t-41-27-28-41-10-50v-256H128q-26 0-49-10t-41-27-28-41-10-50V512q0-26 10-49t27-41 41-28 50-10h256V128q0-26 10-49t27-41 41-28 50-10h1408zM452 940l392 500h205V608H842v488L460 608H244v832h208V940zm1468 980v-384h-384v384h384zm0-512v-384h-384v384h384zm0-512V512h-384v384h384zm0-512V128H512v256h640q26 0 49 10t41 27 28 41 10 50v1024q0 26-10 49t-27 41-41 28-50 10H512v256h896V384h512z" />
    </svg>
  ),
  displayName: 'OneNoteLogo16Icon',
});

export default OneNoteLogo16Icon;
