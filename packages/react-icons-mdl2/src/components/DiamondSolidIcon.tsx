import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DiamondSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M625 768l267-640h264l267 640H625zm971 0l-267-640h123l542 640h-398zm-174 128l-398 946-398-946h796zm575 0l-847 1058 446-1058h401zm-1545 0l446 1058L51 896h401zm0-128H54l540-640h125L452 768z" />
    </svg>
  ),
  displayName: 'DiamondSolidIcon',
});

export default DiamondSolidIcon;
