import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SixPointStarIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1648 1024l307 512h-615l-316 514-316-514H93l306-511L76 512h632L1024-2l316 514h615l-307 512zm-149 0l230-384h-460l-245-398-245 398H308l242 383-231 385h460l245 398 245-398h460l-230-384z" />
    </svg>
  ),
  displayName: 'SixPointStarIcon',
});

export default SixPointStarIcon;
