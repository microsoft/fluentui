import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SmartGlassRemoteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M768 1152v128H640v-128h128zm384 384v-128h128v128h-128zm-256-256v-128h128v128H896zm256 0v-128h128v128h-128zm-384 128v128H640v-128h128zm128 128v-128h128v128H896zm-128 128v128H640v-128h128zm384 128v-128h128v128h-128zm-256 0v-128h128v128H896zm64-896q-66 0-124-25t-102-68-69-102-25-125q0-66 25-124t68-101 102-69 125-26q66 0 124 25t101 69 69 102 26 124q0 66-25 124t-69 102-102 69-124 25zm0-512q-40 0-75 15t-61 41-41 61-15 75q0 40 15 75t41 61 61 41 75 15q40 0 75-15t61-41 41-61 15-75q0-40-15-75t-41-61-61-41-75-15zM384 0h1152v2048H384V0zm1024 1920V128H512v1792h896z" />
    </svg>
  ),
  displayName: 'SmartGlassRemoteIcon',
});

export default SmartGlassRemoteIcon;
