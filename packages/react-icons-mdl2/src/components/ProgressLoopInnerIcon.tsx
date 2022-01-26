import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ProgressLoopInnerIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M448 1024q0 60 12 118t36 112l-111 64q-32-69-48-143t-17-151q0-91 22-176t64-160 99-138 129-111 153-78 173-38v129q-109 12-202 61T595 640 487 815t-39 209zm640-701q90 8 172 38t154 77 129 111 99 139 63 160 23 176q0 77-16 151t-49 144l-111-64q23-55 35-113t13-118q0-110-39-208t-108-176-162-126-203-62V323zm-64 1277q69 0 134-16t125-46 111-74 93-99l111 65q-50 70-113 125t-137 94-156 58-168 21q-86 0-168-20t-156-59-138-94-113-126l112-64q41 55 92 98t111 74 125 47 135 16z" />
    </svg>
  ),
  displayName: 'ProgressLoopInnerIcon',
});

export default ProgressLoopInnerIcon;
