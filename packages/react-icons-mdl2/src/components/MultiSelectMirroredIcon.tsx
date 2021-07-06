import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MultiSelectMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1294 384v128H14V384h1280zm0 512H14V768h1280v128zm0 384H14v-128h1280v128zm0 384H14v-128h1280v128zm400-388l286-286 68 68-354 354-178-178 68-68 110 110zm0-768l286-286 68 68-354 354-178-178 68-68 110 110z" />
    </svg>
  ),
  displayName: 'MultiSelectMirroredIcon',
});

export default MultiSelectMirroredIcon;
