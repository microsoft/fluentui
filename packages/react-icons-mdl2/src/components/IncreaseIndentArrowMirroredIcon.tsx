import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const IncreaseIndentArrowMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 896v128h-646l163 163-90 90-317-317 317-317 90 90-163 163h646z" />
    </svg>
  ),
  displayName: 'IncreaseIndentArrowMirroredIcon',
});

export default IncreaseIndentArrowMirroredIcon;
