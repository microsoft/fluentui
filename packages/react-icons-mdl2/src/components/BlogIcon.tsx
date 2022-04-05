import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BlogIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 0v1536H731l-475 475v-475H0V0h2048zM128 128v256h1792V128H128zm1792 1280V512H128v896h256v293l293-293h1243zm-640-768h512v640h-512V640zm128 512h256V768h-256v384zM256 768h896v128H256V768zm0 256h896v128H256v-128z" />
    </svg>
  ),
  displayName: 'BlogIcon',
});

export default BlogIcon;
