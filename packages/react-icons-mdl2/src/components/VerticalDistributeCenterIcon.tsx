import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const VerticalDistributeCenterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 512v128h-512v256H512V640H0V512h512V256h1024v256h512zm-640-128H640v384h768V384zm384 1024h256v128h-256v256H256v-256H0v-128h256v-256h1536v256zm-128-128H384v384h1280v-384z" />
    </svg>
  ),
  displayName: 'VerticalDistributeCenterIcon',
});

export default VerticalDistributeCenterIcon;
