import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PivotChartIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 0v2048H0V0h2048zm-128 128H128v1792h1792V128zM640 640H256V256h384v384zM512 384H384v128h128V384zm128 1408H256V768h384v1024zM512 896H384v768h128V896zm1280-256H768V256h1024v384zm-128-256H896v128h768V384zM979 1709l-237-237 237-237 90 90-82 83h293q27 0 50-10t40-27 28-41 10-50V987l-83 82-90-90 237-237 237 237-90 90-83-82v293q0 53-20 99t-55 82-81 55-100 20H987l82 83-90 90z" />
    </svg>
  ),
  displayName: 'PivotChartIcon',
});

export default PivotChartIcon;
