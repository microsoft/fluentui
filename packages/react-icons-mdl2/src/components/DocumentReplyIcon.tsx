import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DocumentReplyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 1536q53 0 99 20t82 55 55 81 20 100q0 53-20 99t-55 82-81 55-100 20v-128q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10h-293l162 163-90 90-317-317 317-317 90 90-162 163h293zm-445 384l128 128H128V0h1115l549 549v729l-128-128V640h-512V128H256v1792h1091zm-67-1408h293l-293-293v293z" />
    </svg>
  ),
  displayName: 'DocumentReplyIcon',
});

export default DocumentReplyIcon;
