import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DecreaseIndentLegacyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 384h1024v128H1024V384zm0 1152v-128h1024v128H1024zm0-512V896h1024v128H1024zm768-384v128h-768V640h768zm0 512v128h-768v-128h768zM413 733L250 896h646v128H250l163 163-90 90L6 960l317-317 90 90z" />
    </svg>
  ),
  displayName: 'DecreaseIndentLegacyIcon',
});

export default DecreaseIndentLegacyIcon;
