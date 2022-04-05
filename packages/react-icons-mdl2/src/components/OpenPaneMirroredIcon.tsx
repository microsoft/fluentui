import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const OpenPaneMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 384H0v1152h2048V384zm-128 128v896H640V512h1280zM128 1408V512h384v896H128zm640-512v128h421l-162 163 90 90 317-317-317-317-90 90 162 163H768z" />
    </svg>
  ),
  displayName: 'OpenPaneMirroredIcon',
});

export default OpenPaneMirroredIcon;
