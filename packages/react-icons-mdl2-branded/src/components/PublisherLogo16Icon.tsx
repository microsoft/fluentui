import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const PublisherLogo16Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 384v1280q0 27-10 50t-27 40-41 28-50 10h-128v128q0 27-10 50t-27 40-41 28-50 10H512q-27 0-50-10t-40-27-28-41-10-50v-256H128q-26 0-49-10t-41-27-28-41-10-50V512q0-26 10-49t27-41 41-28 50-10h256V128q0-27 10-50t27-40 41-28 50-10h1152q27 0 50 10t40 27 28 41 10 50v128h128q27 0 50 10t40 27 28 41 10 50zM361 1440h206v-271h107q65 0 121-19t99-57 66-91 24-122q0-70-22-121t-62-85-95-50-122-16H361v832zm1303 480v-384h-384q0 26-10 49t-27 41-41 28-50 10H512v256h1152zm0-512v-384h-384v384h384zm0-512V128H512v256h640q26 0 49 10t41 27 28 41 10 50v384h384zm256 768V384h-128v1280h128zM658 987h-91V791h95q53 0 80 20t28 75q0 57-29 79t-83 22z" />
    </svg>
  ),
  displayName: 'PublisherLogo16Icon',
});

export default PublisherLogo16Icon;
