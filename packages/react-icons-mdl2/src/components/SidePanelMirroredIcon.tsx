import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SidePanelMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 256v1408H0V256h2048zm-128 384h-384v896h384V640zM128 1536h1280V640H128v896zM1920 512V384H128v128h1792z" />
    </svg>
  ),
  displayName: 'SidePanelMirroredIcon',
});

export default SidePanelMirroredIcon;
