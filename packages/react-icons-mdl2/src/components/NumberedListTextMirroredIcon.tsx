import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const NumberedListTextMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1536v-128h1536v128H0zm0-512V896h1536v128H0zm0-640h1536v128H0V384z" />
    </svg>
  ),
  displayName: 'NumberedListTextMirroredIcon',
});

export default NumberedListTextMirroredIcon;
