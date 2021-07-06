import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LineThicknessIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 384v128H0V384h2048zM0 768h2048v256H0V768zm0 512h2048v384H0v-384z" />
    </svg>
  ),
  displayName: 'LineThicknessIcon',
});

export default LineThicknessIcon;
