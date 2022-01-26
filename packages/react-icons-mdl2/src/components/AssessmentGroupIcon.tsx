import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AssessmentGroupIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 1536H384v-256h256v256zm512 0H896v-256h256v256zm512-1024h-256V256h256v256zm0 1024h-256v-256h256v256zm-512-512H896V768h256v256zm512 0h-256V768h256v256zm256-768v1536H128V256h128v1408h1536V256h128z" />
    </svg>
  ),
  displayName: 'AssessmentGroupIcon',
});

export default AssessmentGroupIcon;
