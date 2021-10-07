import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HalfAlphaIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1105 128l640 1920h-135l-171-512H615l-170 512H310L950 128h155zM658 1408h739L1027 300 658 1408z" />
    </svg>
  ),
  displayName: 'HalfAlphaIcon',
});

export default HalfAlphaIcon;
