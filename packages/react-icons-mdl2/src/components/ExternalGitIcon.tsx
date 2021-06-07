import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ExternalGitIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1342 640q38 0 65 27l614 614q27 27 27 65 0 37-27 64l-611 612q-13 13-30 19t-35 7q-17 0-34-6t-30-20l-614-615q-27-27-27-64 0-38 27-65l421-421 160 160q-9 20-9 42 0 21 8 41t24 35q7 7 9 7t11 3v390q-8 4-14 10t-12 12q-19 19-28 38t-10 46q0 23 9 43t24 36 35 24 44 9q24 0 45-7t36-22 25-35 10-44q0-29-17-58t-43-43v-379l146 145q-9 20-9 42t8 41 24 35 34 23 42 9q22 0 42-8t34-23 23-34 9-43q0-23-8-42t-23-34-35-23-42-9q-9 0-18 1t-17 4l-156-156q6-16 6-35 0-22-8-42t-24-34-34-22-42-9q-20 0-34 5l-162-162 127-127q27-27 64-27zM256 1792h512v128H128V128h1792v640h-128V256H256v1536z" />
    </svg>
  ),
  displayName: 'ExternalGitIcon',
});

export default ExternalGitIcon;
