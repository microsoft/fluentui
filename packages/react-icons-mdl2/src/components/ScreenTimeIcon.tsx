import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ScreenTimeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1024q63 83 95 181t33 203q0 133-50 249t-137 204-203 137-250 50q-133 0-249-50t-204-137-137-203-50-250H128q-27 0-50-10t-40-27-28-41-10-50V256q0-27 10-50t27-40 41-28 50-10h1664q27 0 50 10t40 27 28 41 10 50v768zM781 1280q22-112 80-206t142-162 187-106 218-38q104 0 202 32t182 96V256H128v1024h653zm627 640q106 0 199-40t162-110 110-163 41-199q0-106-40-199t-110-162-163-110-199-41q-106 0-199 40t-162 110-110 163-41 199q0 106 40 199t110 162 163 110 199 41zm0-512h256v128h-384v-512h128v384z" />
    </svg>
  ),
  displayName: 'ScreenTimeIcon',
});

export default ScreenTimeIcon;
