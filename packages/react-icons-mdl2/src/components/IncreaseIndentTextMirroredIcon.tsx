import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const IncreaseIndentTextMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1024V896h1024v128H0zm0 512v-128h1024v128H0zm256-256v-128h768v128H256zm0-512V640h768v128H256zM0 384h1024v128H0V384z" />
    </svg>
  ),
  displayName: 'IncreaseIndentTextMirroredIcon',
});

export default IncreaseIndentTextMirroredIcon;
