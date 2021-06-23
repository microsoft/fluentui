import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AssignPolicyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 1024v768h128v128H256V0h1536v1024H384zm0-896v768h1280V128H384zm768 384V384h128v256H768V384h128v128h256zm-512 640h1408v896H640v-896zm1211 128H837l507 262 507-262zM768 1920h1152v-539l-576 297-576-297v539z" />
    </svg>
  ),
  displayName: 'AssignPolicyIcon',
});

export default AssignPolicyIcon;
