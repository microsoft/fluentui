import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AssessmentGroupTemplateIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 1792h512v128H128V0h1792v1024h-128V512H256v1280zm0-1408h1536V128H256v256zm1792 768v896H896v-896h128v768h896v-768h128zm-384 512h128v128h-128v-128zm128-128h-128v-128h128v128zm0-256h-128v-128h128v128zm-384 384h128v128h-128v-128zm128-128h-128v-128h128v128zm-384 256v-128h128v128h-128z" />
    </svg>
  ),
  displayName: 'AssessmentGroupTemplateIcon',
});

export default AssessmentGroupTemplateIcon;
