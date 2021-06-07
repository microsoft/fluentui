import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DragObjectIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1043 1395l90 90-173 174-173-174 90-90 83 83 83-83zM877 526l-90-91 173-173 173 173-90 91-83-83-83 83zM269 877l-82 83 82 83-90 90L6 960l173-173 90 90zm1645 83l-173 173-90-90 83-83-83-83 90-90 173 173zM384 640h1152v128H384V640zm0 256h1152v128H384V896zm0 256h1152v128H384v-128z" />
    </svg>
  ),
  displayName: 'DragObjectIcon',
});

export default DragObjectIcon;
