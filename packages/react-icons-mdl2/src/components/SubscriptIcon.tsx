import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SubscriptIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1701 1894q-6 6-10 12t-10 14h239v128h-384v-64q0-52 19-94t47-77 62-64 61-54 48-48 19-47q0-26-19-45t-45-19q-26 0-45 19t-19 45h-128q0-40 15-75t41-61 61-41 75-15q40 0 75 15t61 41 41 61 15 75q0 38-15 73t-41 63h-1l-162 158zM1440 512l-384 512 384 512h-160l-304-405-304 405H512l384-512-384-512h160l304 405 304-405h160z" />
    </svg>
  ),
  displayName: 'SubscriptIcon',
});

export default SubscriptIcon;
