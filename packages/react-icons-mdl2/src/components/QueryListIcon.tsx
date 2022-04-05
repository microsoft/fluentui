import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const QueryListIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 128H0V0h1664v128zm0 512H0V512h1664v128zM0 1024h768v128H0v-128zm2048 0v219l-384 384v421h-384v-421l-384-384v-219h1152zm-128 128h-896v37l384 384v347h128v-347l384-384v-37z" />
    </svg>
  ),
  displayName: 'QueryListIcon',
});

export default QueryListIcon;
