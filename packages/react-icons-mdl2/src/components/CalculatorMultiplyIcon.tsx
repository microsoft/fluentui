import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CalculatorMultiplyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1805 205l-755 755 755 755-90 90-755-755-755 755-90-90 755-755-755-755 90-90 755 755 755-755 90 90z" />
    </svg>
  ),
  displayName: 'CalculatorMultiplyIcon',
});

export default CalculatorMultiplyIcon;
