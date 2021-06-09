import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TransitionEffectIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 0v896H0V0h128v768h768V347L733 509l-90-90 317-317 317 317-90 90-163-162v421h768V0h128zM0 1024h1920v896h-128v-768h-768v421l163-162 90 90-317 317-317-317 90-90 163 162v-421H128v768H0v-896z" />
    </svg>
  ),
  displayName: 'TransitionEffectIcon',
});

export default TransitionEffectIcon;
