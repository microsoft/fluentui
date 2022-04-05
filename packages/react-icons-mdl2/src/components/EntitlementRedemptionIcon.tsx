import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EntitlementRedemptionIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 512h640v128H256V512zm1152 256v128H256V768h1152zm0 256v128H256v-128h1152zm0 256v128H256v-128h1152zM256 1664v-128h926l-128 128H256zm-128 256h1027l128 128H0V0h1115l549 549v862l-128 128V640h-512V128H128v1792zM1152 219v293h293l-293-293zm787 1144l90 90-557 558-269-270 90-90 179 178 467-466z" />
    </svg>
  ),
  displayName: 'EntitlementRedemptionIcon',
});

export default EntitlementRedemptionIcon;
