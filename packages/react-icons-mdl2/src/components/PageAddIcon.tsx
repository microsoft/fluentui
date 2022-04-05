import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PageAddIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 1664h256v128h-256v256h-128v-256h-256v-128h256v-256h128v256zM384 128v1536h768v128H256V0h859l549 549v731h-128V640h-512V128H384zm768 91v293h293l-293-293z" />
    </svg>
  ),
  displayName: 'PageAddIcon',
});

export default PageAddIcon;
