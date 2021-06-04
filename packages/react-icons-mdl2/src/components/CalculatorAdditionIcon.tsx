import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CalculatorAdditionIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 896v128h-896v896H896v-896H0V896h896V0h128v896h896z" />
    </svg>
  ),
  displayName: 'CalculatorAdditionIcon',
});

export default CalculatorAdditionIcon;
