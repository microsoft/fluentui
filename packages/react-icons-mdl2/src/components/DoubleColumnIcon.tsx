import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DoubleColumnIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1792V256h896v1536H0zM128 384v1280h640V384H128zm896-128h896v1536h-896V256zm768 1408V384h-640v1280h640z" />
    </svg>
  ),
  displayName: 'DoubleColumnIcon',
});

export default DoubleColumnIcon;
