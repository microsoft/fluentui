import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const AuthenticatorAppIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1024 640q197 0 389 32t379 96v128q0 189-55 365t-155 327-242 269-316 191q-173-72-315-190t-242-269-156-326-55-364q0-13 2-30t4-35 5-35 5-31q185-64 371-96t381-32zm256 896v-32q0-41-12-79t-36-70-55-56-71-37q51-24 80-71t30-103q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75q0 56 29 103t81 71q-39 13-71 37t-55 56-35 70-13 79v32h512zM1024 192q-66 0-124 25t-102 68-69 102-25 125l-192 32v-32q0-106 40-199t110-162T825 41t199-41q106 0 199 40t162 110 110 163 41 199v32l-192-32q0-66-25-124t-68-102-102-69-125-25z" />
    </svg>
  ),
  displayName: 'AuthenticatorAppIcon',
});

export default AuthenticatorAppIcon;
