import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const IncreaseIndentTextIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 640v128h-768V640h768zm-768-256h1024v128H1024V384zm768 768v128h-768v-128h768zm-768 384v-128h1024v128H1024zm0-512V896h1024v128H1024z" />
    </svg>
  ),
  displayName: 'IncreaseIndentTextIcon',
});

export default IncreaseIndentTextIcon;
