import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RemoveOccurrenceIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 256v512h-512V640h316q-59-117-146-211t-196-161-231-103-255-37q-154 0-295 47T471 309 268 517 136 787L14 749q50-166 149-304t232-237T689 55t335-55q137 0 267 34t245 98 214 157 170 210V256h128zM1024 1920q39 0 77-4t77-13l108 108q-31 8-62 14t-64 12l-8-64 8 64q-34 5-67 8t-69 3q-138 0-267-34t-245-98-213-157-171-210v243H0v-512h512v128H196q59 117 146 211t196 161 231 103 255 37zm1021-418l-226 226 226 227-90 90-227-226-227 227-90-91 227-227-227-227 90-90 227 227 227-227 90 91z" />
    </svg>
  ),
  displayName: 'RemoveOccurrenceIcon',
});

export default RemoveOccurrenceIcon;
