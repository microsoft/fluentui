import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const FileTypeSolutionIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M128 1664h512v128H0V128h2048v576h-128v-64H128v1024zm0-1408v256h1792V256H128zm1920 634v1021l-320 137-503-503-335 259-122-76v-639l122-77 335 259 503-503 320 122zm-960 518l-183-183v366l183-183zm640-274l-320 274 320 274v-548z" />
    </svg>
  ),
  displayName: 'FileTypeSolutionIcon',
});

export default FileTypeSolutionIcon;
