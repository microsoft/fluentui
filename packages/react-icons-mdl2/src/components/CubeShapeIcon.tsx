import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CubeShapeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 569v1038l-832 417-832-417V569l832-417 832 417zM960 296L335 608l625 312 625-312-625-312zM256 1528l640 321v-817L256 711v817zm1408 0V711l-640 321v817l640-321z" />
    </svg>
  ),
  displayName: 'CubeShapeIcon',
});

export default CubeShapeIcon;
