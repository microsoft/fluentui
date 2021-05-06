import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const OneNoteMonoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path d="M17.34,3a.68.68,0,0,1,.66.66V16.34a.68.68,0,0,1-.66.66H6.66A.68.68,0,0,1,6,16.34V14H2.66a.63.63,0,0,1-.46-.2.63.63,0,0,1-.2-.46V6.66a.63.63,0,0,1,.2-.46A.63.63,0,0,1,2.66,6H6V3.66A.68.68,0,0,1,6.66,3ZM5,9.34l1.89,3.28H8.12V7.38H7v3.35L5.14,7.38H3.88v5.24H5ZM17,16V14H15v2Zm0-3V11H15v2Zm0-3V8H15v2Zm0-3V4H7V6H9.34a.68.68,0,0,1,.66.66v6.68a.68.68,0,0,1-.66.66H7v2h7V7Z" />
    </svg>
  ),
  displayName: 'OneNoteMonoIcon',
});
