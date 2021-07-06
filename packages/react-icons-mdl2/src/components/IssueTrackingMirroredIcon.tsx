import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const IssueTrackingMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 0h1536v2048H256V0zm1408 1920V128H384v1792h1280zM1024 512v128H512V512h512zm0 512v128H512v-128h512zm0 512v128H512v-128h512zm493-1107l-237 237-173-173 90-90 83 83 147-147 90 90zm0 512l-237 237-173-173 90-90 83 83 147-147 90 90zm0 512l-237 237-173-173 90-90 83 83 147-147 90 90z" />
    </svg>
  ),
  displayName: 'IssueTrackingMirroredIcon',
});

export default IssueTrackingMirroredIcon;
