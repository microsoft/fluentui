import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const IncreaseIndentMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 128v128H128V128h1792zM128 1792v-128h1792v128H128zM896 640v128H128V640h768zm0 512v128H128v-128h768zm506-256h646v128h-646l163 163-90 90-317-317 317-317 90 90-163 163z" />
    </svg>
  ),
  displayName: 'IncreaseIndentMirroredIcon',
});

export default IncreaseIndentMirroredIcon;
