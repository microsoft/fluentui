import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RectangularClippingIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 256v1152h-128V384H128v1280h1024v128H0V256h2048zm-256 1408h256v128h-256v256h-128v-256h-256v-128h256v-256h128v256z" />
    </svg>
  ),
  displayName: 'RectangularClippingIcon',
});

export default RectangularClippingIcon;
