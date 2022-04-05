import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DockLeftMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 384H0v1152h2048V384zm-128 128v896h-384V512h384zM128 1408V512h1280v896H128z" />
    </svg>
  ),
  displayName: 'DockLeftMirroredIcon',
});

export default DockLeftMirroredIcon;
