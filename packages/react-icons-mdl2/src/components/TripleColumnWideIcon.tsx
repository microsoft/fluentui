import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TripleColumnWideIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 256h512v1536H0V256zm128 1408h256V384H128v1280zM2048 256v1536h-512V256h512zm-128 128h-256v1280h256V384zM640 256h768v1536H640V256zm128 1408h512V384H768v1280z" />
    </svg>
  ),
  displayName: 'TripleColumnWideIcon',
});

export default TripleColumnWideIcon;
