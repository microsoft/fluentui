import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ColumnOptionsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1024h-128V640h-512v384h-128V640H768v1024h256v128H0V128h2048zM640 640H128v1024h512V640zm1280-128V256H128v256h1792zm118 976l-124 51q6 30 6 61t-6 61l124 51-49 119-124-52q-35 51-86 86l52 124-119 49-51-124q-30 6-61 6t-61-6l-51 124-119-49 52-124q-51-35-86-86l-124 52-49-119 124-51q-6-30-6-61t6-61l-124-51 49-119 124 52q35-51 86-86l-52-124 119-49 51 124q30-6 61-6t61 6l51-124 119 49-52 124q51 35 86 86l124-52 49 119zm-437 304q40 0 74-15t61-41 41-62 15-75q0-39-15-74t-41-61-62-41-74-15q-40 0-75 15t-61 42-41 61-15 75q0 40 15 74t41 61 62 41 75 15z" />
    </svg>
  ),
  displayName: 'ColumnOptionsIcon',
});

export default ColumnOptionsIcon;
