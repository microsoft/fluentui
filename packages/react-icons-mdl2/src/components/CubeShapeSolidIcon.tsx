import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CubeShapeSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 152l750 376-750 375-750-375 750-376zM128 1607V665l768 384v942l-768-384zm896-558l768-384v942l-768 384v-942z" />
    </svg>
  ),
  displayName: 'CubeShapeSolidIcon',
});

export default CubeShapeSolidIcon;
