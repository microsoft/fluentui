import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SyncToPCIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 256v512h-512V640h316q-59-117-146-211t-196-161-231-103-255-37q-154 0-295 47T471 309 268 517 136 787L14 749q50-166 149-304t232-237T689 55t335-55q137 0 267 34t245 98 214 157 170 210V256h128zM196 1408q59 117 146 211t196 161 231 103 255 37h128v118q-32 4-64 7t-64 3q-136 0-266-34t-246-100-214-157-170-208v243H0v-512h511v128H196zm956-256h896v640h-384v128h127v128h-383v-128h128v-128h-384v-640zm128 512h640v-384h-640v384z" />
    </svg>
  ),
  displayName: 'SyncToPCIcon',
});

export default SyncToPCIcon;
