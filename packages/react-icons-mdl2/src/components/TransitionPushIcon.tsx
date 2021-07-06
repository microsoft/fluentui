import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TransitionPushIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 384h2048v1152H0V384zm128 1024h1792V512H128v896zM2048 128v128H0V128h2048zM0 1664h2048v128H0v-128zm1371-768h421v128h-421l162 163-90 90-317-317 317-317 90 90-162 163zM605 643l317 317-317 317-90-90 162-163H256V896h421L515 733l90-90z" />
    </svg>
  ),
  displayName: 'TransitionPushIcon',
});

export default TransitionPushIcon;
