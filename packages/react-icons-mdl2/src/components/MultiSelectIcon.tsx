import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MultiSelectIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 384v128H768V384h1280zM768 768h1280v128H768V768zm0 384h1280v128H768v-128zm0 384h1280v128H768v-128zM478 990l68 68-354 354-178-178 68-68 110 110 286-286zm0-768l68 68-354 354L14 466l68-68 110 110 286-286z" />
    </svg>
  ),
  displayName: 'MultiSelectIcon',
});

export default MultiSelectIcon;
