import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SquareShapeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 128v1792H128V128h1792zm-128 128H256v1536h1536V256z" />
    </svg>
  ),
  displayName: 'SquareShapeIcon',
});

export default SquareShapeIcon;
