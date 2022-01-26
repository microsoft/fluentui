import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TabCenterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 640v1280H512v-512H128V128h1408v512h384zm-128 1152v-768H640v768h1152zM512 1280V640h896V512H256v768h256zM256 256v128h1152V256H256zm1536 512H640v128h1152V768z" />
    </svg>
  ),
  displayName: 'TabCenterIcon',
});

export default TabCenterIcon;
