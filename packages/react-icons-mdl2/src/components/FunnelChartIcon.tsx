import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FunnelChartIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 0h2048L1024 2048 0 0zm1841 128H207l128 256h1378l128-256zM783 1280l241 482 241-482H783zm546-128l128-256H591l128 256h610zm192-384l128-256H399l128 256h994z" />
    </svg>
  ),
  displayName: 'FunnelChartIcon',
});

export default FunnelChartIcon;
