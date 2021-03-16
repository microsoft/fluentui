import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const ProjectCollectionIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1920 640q27 0 50 10t40 27 28 41 10 50v1152H256v-512H0V128q0-27 10-50t27-40 41-28 50-10h480q45 0 77 9t58 24 45 31 41 31 44 23 55 10h736q27 0 50 10t40 27 28 41 10 50v384h128zM128 128v128h480q24 0 42-4t33-13 29-20 32-27q-17-15-31-26t-30-20-33-13-42-5H128zm128 1152V640q0-27 10-50t27-40 41-28 50-10h480q45 0 77 9t58 24 46 31 40 31 44 23 55 10h480V256H928q-31 0-54 9t-44 24-41 31-45 31-58 23-78 10H128v896h128zm744-576q-17-15-31-26t-30-20-33-13-42-5H384v128h480q24 0 42-4t33-13 29-20 32-27zm920 64h-736q-31 0-54 9t-44 24-41 31-45 31-58 23-78 10H384v896h1536V768z" />
    </svg>
  ),
  displayName: 'ProjectCollectionIcon',
});

export default ProjectCollectionIcon;
