import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BlockedSiteSolid12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1877 250v501q0 144-37 274t-103 248-155 221-193 194-219 168-231 143q-116-61-230-138t-219-169-194-197-155-224-103-248T0 751V250q84 0 159-5t147-22 142-44 143-75q42-26 83-45t83-33 87-19 95-7q51 0 96 6t87 20 83 33 83 47q71 45 141 73t142 44 148 21 158 6zm-438 1038l-349-349 351-352-151-150-351 351-352-351-150 150 351 352-351 351 150 151 352-351 349 349 151-151z" />
    </svg>
  ),
  displayName: 'BlockedSiteSolid12Icon',
});

export default BlockedSiteSolid12Icon;
