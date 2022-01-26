import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FinancialIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 896h128v1152h-128V896zM512 1344l128-128v832H512v-704zm-256 256l128-128v576H256v-448zm512-512l128-128v1088H768v-960zm256-128l128 128v959h-128V960zm320 320l64-64v832h-128v-832l64 64zm192-192l128-128v1088h-128v-960zM0 1856l128-128v320H0v-192zM2048 256v512h-128V475l-576 575-384-384L0 1627v-182l960-959 384 384 485-486h-293V256h512z" />
    </svg>
  ),
  displayName: 'FinancialIcon',
});

export default FinancialIcon;
