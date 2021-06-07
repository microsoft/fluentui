import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SyncIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 1920q154 0 295-47t258-134 203-208 132-270l122 38q-50 167-149 304t-232 237-294 153-335 55q-137 0-267-34t-245-98-214-157-170-210v243H0v-512h512v128H196q59 117 146 211t196 161 231 103 255 37zM2048 256v512h-512V640h316q-59-117-146-211t-196-161-231-103-255-37q-154 0-295 47T471 309 268 517 136 787L14 749q50-166 149-304t232-237T689 55t335-55q137 0 267 34t245 98 214 157 170 210V256h128z" />
    </svg>
  ),
  displayName: 'SyncIcon',
});

export default SyncIcon;
