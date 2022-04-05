import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FontIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M765 1024H387l-85 256H167L509 256h134l268 802-81 162-65-196zm-43-128L576 458 430 896h292zm982 679q17 41 31 73t35 54 50 34 78 12v44h-449v-44h37q20 0 39-3t30-17 12-37q0-14-6-39t-16-54-21-59-22-58-19-46-11-27h-448q-3 8-12 27t-20 46-24 57-23 58-17 54-7 40q0 24 12 35t31 16 38 5 37 2v44H662v-44q49-9 76-21t44-32 30-52 33-79l392-924h82l385 935zm-291-295l-177-381-169 381h346z" />
    </svg>
  ),
  displayName: 'FontIcon',
});

export default FontIcon;
