import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UnstackSelectedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 640v1152H512v-256H256v-256H0V128h1313q-69 20-133 52t-123 76H128v896h1280V640h64l64 64v576H384v128h1280V768l128-128v896H640v128h1280V640h128zM896 896q0-88 23-170t64-153 100-129 130-100 153-65 170-23h165l-146-147 90-90 301 301-301 301-90-90 146-147h-165q-106 0-199 40t-162 110-110 163-41 199H896z" />
    </svg>
  ),
  displayName: 'UnstackSelectedIcon',
});

export default UnstackSelectedIcon;
