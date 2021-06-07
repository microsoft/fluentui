import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SidePanelIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 256h2048v1408H0V256zm128 384v896h384V640H128zm1792 896V640H640v896h1280zM128 512h1792V384H128v128z" />
    </svg>
  ),
  displayName: 'SidePanelIcon',
});

export default SidePanelIcon;
