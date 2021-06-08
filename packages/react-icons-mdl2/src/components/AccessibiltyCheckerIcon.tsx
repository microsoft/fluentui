import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AccessibiltyCheckerIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 128v1792h384v128H0V0h1115l549 549v91h-640V128H128zm1024 91v293h293l-293-293zm384 1061l-192 256-192-256h128V768h128v512h128zm512 64l-256 192v-128h-192l96-128h96v-128l256 192zm-1401 64q9-81 39-155t82-139l91 91q-69 90-84 203H647zm128 128q15 113 84 203l-91 91q-51-64-81-138t-40-156h128zm377-505q-113 15-203 84l-91-91q64-51 138-81t156-40v128zm421 708q69-90 84-203h128q-9 81-39 155t-82 139l-91-91zm-293 174q113-15 203-84l91 91q-64 51-138 81t-156 40v-128zm-422 7l91-91q90 69 203 84v128q-81-9-155-39t-139-82z" />
    </svg>
  ),
  displayName: 'AccessibiltyCheckerIcon',
});

export default AccessibiltyCheckerIcon;
