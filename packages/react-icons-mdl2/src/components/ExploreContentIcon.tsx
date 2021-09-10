import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ExploreContentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 0v1792h-128V128H256V0h1792zM128 256h1664v1664H128V256zm128 1536h1408V384H256v1408zm768-768h384v128h-384v384H896v-384H512v-128h384V640h128v384z" />
    </svg>
  ),
  displayName: 'ExploreContentIcon',
});

export default ExploreContentIcon;
