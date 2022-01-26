import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CheckListTextMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 384h1408v128H0V384zm0 896v-128h1408v128H0zm0 384v-128h1408v128H0zm0-768V768h1408v128H0z" />
    </svg>
  ),
  displayName: 'CheckListTextMirroredIcon',
});

export default CheckListTextMirroredIcon;
