import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GridViewMediumIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 128v1664H128V128h1664zm-128 128h-640v640h640V256zm-1408 0v640h640V256H256zm0 1408h640v-640H256v640zm1408 0v-640h-640v640h640z" />
    </svg>
  ),
  displayName: 'GridViewMediumIcon',
});

export default GridViewMediumIcon;
