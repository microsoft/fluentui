import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CustomizeToolbarIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 1024H384V512h512v512zM512 640v256h256V640H512zm1152-128v512h-512V512h512zm-128 384V640h-256v256h256zM0 256h2048v768h-128V384H128v768h896v128H0V256zm1989 1113l49 119-124 51q6 30 6 61t-6 61l124 51-49 119-124-52q-35 51-86 86l52 124-119 49-51-124q-30 6-61 6t-61-6l-51 124-119-49 52-124q-51-35-86-86l-124 52-49-119 124-51q-6-30-6-61t6-61l-124-51 49-119 124 52q35-51 86-86l-52-124 119-49 51 124q30-6 61-6t61 6l51-124 119 49-52 124q51 35 86 86l124-52zm-197 231q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75q0 40 15 75t41 61 61 41 75 15q40 0 75-15t61-41 41-61 15-75z" />
    </svg>
  ),
  displayName: 'CustomizeToolbarIcon',
});

export default CustomizeToolbarIcon;
