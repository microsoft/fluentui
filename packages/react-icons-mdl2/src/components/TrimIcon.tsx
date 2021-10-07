import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TrimIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 384H512V256h128v128zm768-128h128v128h-128V256zM640 640H512V512h128v128zm768-128h128v128h-128V512zM512 1664h128v128H512v-128zm896 0h128v128h-128v-128zm-896-256h128v128H512v-128zm896 0h128v128h-128v-128zM0 768h128v512H0V768zm256 0h128v512H256V768zm1408 0h128v512h-128V768zm384 0v512h-128V768h128zm-1536 0h1024v512H512V768zm128 384h768V896H640v256z" />
    </svg>
  ),
  displayName: 'TrimIcon',
});

export default TrimIcon;
