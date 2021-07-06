import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SingleColumnIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 256h1920v1536H0V256zm1792 1408V384H128v1280h1664z" />
    </svg>
  ),
  displayName: 'SingleColumnIcon',
});

export default SingleColumnIcon;
