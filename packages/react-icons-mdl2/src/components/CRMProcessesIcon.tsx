import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CRMProcessesIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 384h2048v1152H0V384zm128 1024h293l449-448-449-448H128v896zm1792 0V512H603l447 448-447 448h1317z" />
    </svg>
  ),
  displayName: 'CRMProcessesIcon',
});

export default CRMProcessesIcon;
