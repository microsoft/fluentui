import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const NumberedListTextIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M512 1536v-128h1536v128H512zm0-1152h1536v128H512V384zm0 640V896h1536v128H512z" />
    </svg>
  ),
  displayName: 'NumberedListTextIcon',
});

export default NumberedListTextIcon;
