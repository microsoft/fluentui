import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CloneToDesktopIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 1536h256v128H640v-128h256v-128H0V256h1920v768h-128V384H128v896h1408v128h-512v128zm1021 93l-317 317-317-317 90-90 163 162v-549h128v549l163-162 90 90z" />
    </svg>
  ),
  displayName: 'CloneToDesktopIcon',
});

export default CloneToDesktopIcon;
