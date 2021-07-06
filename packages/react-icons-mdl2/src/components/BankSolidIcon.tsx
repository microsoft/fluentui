import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BankSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 640v128H0V640l960-480 960 480zM256 896v512H128V896h128zm256 0v512H384V896h128zm256 0v512H640V896h128zm256 0v512H896V896h128zm256 0v512h-128V896h128zm256 0v512h-128V896h128zm256 512h-128V896h128v512zm0 128l128 384H0l128-384h1664z" />
    </svg>
  ),
  displayName: 'BankSolidIcon',
});

export default BankSolidIcon;
