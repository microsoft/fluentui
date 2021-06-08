import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ScatterChartIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 128v1664h1664v128H128V128h128zm1536 128v256h-256V256h256zM768 384v256H512V384h256zm512 384v256h-256V768h256zm-512 512v256H512v-256h256zm896-128h256v256h-256v-256z" />
    </svg>
  ),
  displayName: 'ScatterChartIcon',
});

export default ScatterChartIcon;
