import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TextRotationIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1332 640l-48 128h-103l240-640h102l240 640h-103l-48-128h-280zm140-375l-92 247h184l-92-247zm227 1242l90 90-317 317-317-317 90-90 163 163V896h128v774l163-163zM640 1670l163-163 90 90-317 317-317-317 90-90 163 163V128h128v1542z" />
    </svg>
  ),
  displayName: 'TextRotationIcon',
});

export default TextRotationIcon;
