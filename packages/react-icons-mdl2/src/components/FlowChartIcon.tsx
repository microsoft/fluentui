import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FlowChartIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1408 1152h640v640h-640v-256H992l-416 416-480-480 416-416V640H256V0h640v640H640v416l352 352h416v-256zM384 128v384h384V128H384zm192 1632l288-288-288-288-288 288 288 288zm1344-96v-384h-384v384h384z" />
    </svg>
  ),
  displayName: 'FlowChartIcon',
});

export default FlowChartIcon;
