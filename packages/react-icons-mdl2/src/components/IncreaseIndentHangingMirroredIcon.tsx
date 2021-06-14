import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const IncreaseIndentHangingMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 128v128H128V128h1792zM128 1792v-128h768v128H128zm0-1024V640h768v128H128zm0 512v-128h768v128H128zm1920-384v128h-646l163 163-90 90-317-317 317-317 90 90-163 163h646z" />
    </svg>
  ),
  displayName: 'IncreaseIndentHangingMirroredIcon',
});

export default IncreaseIndentHangingMirroredIcon;
