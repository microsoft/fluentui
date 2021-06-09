import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const IncreaseIndentHangingIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 128h1792v128H128V128zm1024 1664v-128h768v128h-768zm0-1024V640h768v128h-768zm0 512v-128h768v128h-768zM483 733l90-90 317 317-317 317-90-90 163-163H0V896h646L483 733z" />
    </svg>
  ),
  displayName: 'IncreaseIndentHangingIcon',
});

export default IncreaseIndentHangingIcon;
