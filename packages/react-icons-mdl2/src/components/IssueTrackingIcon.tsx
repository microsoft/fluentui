import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const IssueTrackingIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 0h1536v2048H256V0zm1408 1920V128H384v1792h1280zM1536 512v128h-512V512h512zm0 512v128h-512v-128h512zm0 512v128h-512v-128h512zM941 429L704 666 531 493l90-90 83 83 147-147 90 90zm0 512l-237 237-173-173 90-90 83 83 147-147 90 90zm0 512l-237 237-173-173 90-90 83 83 147-147 90 90z" />
    </svg>
  ),
  displayName: 'IssueTrackingIcon',
});

export default IssueTrackingIcon;
