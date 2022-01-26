import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ReportWarningIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M910 1664l-64 128H256V0h1536v1179l-128-256V128H384v1536h526zM640 896H512V768h128v128zm654 0H768V768h590l-64 128zm-782 256h128v128H512v-128zm256 0h398l-64 128H768v-128zM640 512H512V384h128v128zm896 0H768V384h768v128zm0 896v320h-128v-320h128zm-128 384h128v128h-128v-128zm640 256H896l576-1152 576 1152zm-971-112h790l-395-790-395 790z" />
    </svg>
  ),
  displayName: 'ReportWarningIcon',
});

export default ReportWarningIcon;
