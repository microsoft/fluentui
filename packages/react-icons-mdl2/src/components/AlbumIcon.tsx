import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AlbumIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1856 256q40 0 75 15t61 41 41 61 15 75v1152q0 40-15 75t-41 61-61 41-75 15H0V256h1856zM128 1664h128V384H128v1280zM1920 448q0-26-19-45t-45-19H384v1280h1472q26 0 45-19t19-45V448zM768 640h768v384H768V640zm128 256h512V768H896v128z" />
    </svg>
  ),
  displayName: 'AlbumIcon',
});

export default AlbumIcon;
