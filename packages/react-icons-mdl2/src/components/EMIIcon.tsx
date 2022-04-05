import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EMIIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 128v1792h-512v-512H896v512H384V128h1152zm-128 128H512v1536h256v-512h384v512h256V256zM768 640H640V384h128v256zm256 0H896V384h128v256zm-256 384H640V768h128v256zm256 0H896V768h128v256zm256-384h-128V384h128v256zm0 384h-128V768h128v256z" />
    </svg>
  ),
  displayName: 'EMIIcon',
});

export default EMIIcon;
