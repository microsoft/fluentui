import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const QuadColumnIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 256h384v1536H0V256zm128 1408h128V384H128v1280zm896-1408h384v1536h-384V256zm128 1408h128V384h-128v1280zM512 256h384v1536H512V256zm128 1408h128V384H640v1280zM1920 256v1536h-384V256h384zm-128 128h-128v1280h128V384z" />
    </svg>
  ),
  displayName: 'QuadColumnIcon',
});

export default QuadColumnIcon;
