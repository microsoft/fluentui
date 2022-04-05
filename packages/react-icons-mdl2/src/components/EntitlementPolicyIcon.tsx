import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EntitlementPolicyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 128v1792h896v128H0V0h1115l549 549v731h-128V640h-512V128H128zm1024 91v293h293l-293-293zM256 512h640v128H256V512zm1152 256v128H256V768h1152zM256 1152v-128h1152v128H256zm0 256v-128h768v128H256zm0 256v-128h768v128H256zm1152-256h640v128h-640v-128zm0 384v-128h640v128h-640zm0 256v-128h640v128h-640zm-256-512v-128h128v128h-128zm0 256v-128h128v128h-128zm0 256v-128h128v128h-128z" />
    </svg>
  ),
  displayName: 'EntitlementPolicyIcon',
});

export default EntitlementPolicyIcon;
