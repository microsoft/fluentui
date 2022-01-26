import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CalculatorNotEqualToIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1432 640l-747 640h1235v128H536l-430 369-84-98 317-271H0v-128h488l747-640H0V512h1384l430-369 84 98-317 271h339v128h-488z" />
    </svg>
  ),
  displayName: 'CalculatorNotEqualToIcon',
});

export default CalculatorNotEqualToIcon;
