import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AlbumRemoveIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1856 256q40 0 75 15t61 41 41 61 15 75v768h-128V448q0-26-19-45t-45-19H384v1280h832v128H0V256h1856zM256 384H128v1280h128V384zm1280 640H768V640h768v384zm-128-256H896v128h512V768zm586 685l-226 227 226 226-90 90-226-226-225 224-90-90 224-224-224-225 90-90 225 224 226-226 90 90z" />
    </svg>
  ),
  displayName: 'AlbumRemoveIcon',
});

export default AlbumRemoveIcon;
