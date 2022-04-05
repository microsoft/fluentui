import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MountainClimbingIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1408 817l616 1231H24L768 561V0h512v384H896v177l320 640 192-384zM896 128v128h256V128H896zm93 905L832 719l-157 314 157 156 157-156zm443 887l-383-767-217 218-217-218-383 767h1200zm144 0h240l-408-817-120 241 288 576z" />
    </svg>
  ),
  displayName: 'MountainClimbingIcon',
});

export default MountainClimbingIcon;
