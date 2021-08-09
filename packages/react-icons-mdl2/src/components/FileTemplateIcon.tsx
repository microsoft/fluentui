import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FileTemplateIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1243 0l549 549v219h-128V640h-512V128H256v1792h768v128H128V0h1115zm37 512h293l-293-293v293zm640 1408h128v128h-128v-128zm-256 0h128v128h-128v-128zm-256 0h128v128h-128v-128zm256-1024h128v128h-128V896zm-256 0h128v128h-128V896zm-256 1024h128v128h-128v-128zm768-256h128v128h-128v-128zm-768 0h128v128h-128v-128zm768-256h128v128h-128v-128zm-768 0h128v128h-128v-128zm768-256h128v128h-128v-128zm-768 0h128v128h-128v-128zm896-256v128h-128V896h128zm-896 0h128v128h-128V896z" />
    </svg>
  ),
  displayName: 'FileTemplateIcon',
});

export default FileTemplateIcon;
