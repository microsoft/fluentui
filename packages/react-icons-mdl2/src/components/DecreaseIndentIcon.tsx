import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DecreaseIndentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 128h1792v128H128V128zm0 1664v-128h1792v128H128zM1152 768V640h768v128h-768zm0 512v-128h768v128h-768zM317 643l90 90-163 163h646v128H244l163 163-90 90L0 960l317-317z" />
    </svg>
  ),
  displayName: 'DecreaseIndentIcon',
});

export default DecreaseIndentIcon;
