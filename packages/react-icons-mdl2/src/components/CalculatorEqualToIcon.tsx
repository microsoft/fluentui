import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CalculatorEqualToIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1408v-128h1920v128H0zm0-896h1920v128H0V512z" />
    </svg>
  ),
  displayName: 'CalculatorEqualToIcon',
});

export default CalculatorEqualToIcon;
