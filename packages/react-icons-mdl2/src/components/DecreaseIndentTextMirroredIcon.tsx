import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DecreaseIndentTextMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 1280v-128h768v128H256zM0 1536v-128h1024v128H0zM0 384h1024v128H0V384zm0 640V896h1024v128H0zm256-256V640h768v128H256z" />
    </svg>
  ),
  displayName: 'DecreaseIndentTextMirroredIcon',
});

export default DecreaseIndentTextMirroredIcon;
