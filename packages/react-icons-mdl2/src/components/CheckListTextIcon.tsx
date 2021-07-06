import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CheckListTextIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 1664v-128h1408v128H640zm0-384v-128h1408v128H640zm0-896h1408v128H640V384zm0 512V768h1408v128H640z" />
    </svg>
  ),
  displayName: 'CheckListTextIcon',
});

export default CheckListTextIcon;
