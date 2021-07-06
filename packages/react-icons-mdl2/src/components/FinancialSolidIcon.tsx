import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FinancialSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1898l384-384v534H0v-150zm512-512l384-384v1046H512v-662zm1280-490h128v1152h-384v-918l256-234zm-448 426l64-64v790h-384V1002l320 320zm704-1066v512h-128V475l-576 575-384-384L0 1627v-182l960-959 384 384 485-486h-293V256h512z" />
    </svg>
  ),
  displayName: 'FinancialSolidIcon',
});

export default FinancialSolidIcon;
