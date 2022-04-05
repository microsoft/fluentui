import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PageCheckedOutIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 128v1792h1152v128H128V0h1115l549 549v923l-128-128V640h-512V128H256zm1024 91v293h293l-293-293zm640 1317h128v512h-512v-128h293l-402-403 90-90 403 402v-293z" />
    </svg>
  ),
  displayName: 'PageCheckedOutIcon',
});

export default PageCheckedOutIcon;
